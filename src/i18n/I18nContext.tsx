import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import enLocale from './locales/en.json';
import arLocale from './locales/ar.json';

// Supported locales
export type Locale = 'en' | 'ar';

// Direction type for RTL/LTR support
export type Direction = 'ltr' | 'rtl';

// Locale configuration
interface LocaleConfig {
    name: string;
    nativeName: string;
    direction: Direction;
    dateFormat: string;
    numberFormat: string;
}

export const LOCALE_CONFIG: Record<Locale, LocaleConfig> = {
    en: {
        name: 'English',
        nativeName: 'English',
        direction: 'ltr',
        dateFormat: 'MMM DD, YYYY',
        numberFormat: 'en-US',
    },
    ar: {
        name: 'Arabic',
        nativeName: 'العربية',
        direction: 'rtl',
        dateFormat: 'DD MMM YYYY',
        numberFormat: 'ar-SA',
    },
};

// Available translations
const translations: Record<Locale, typeof enLocale> = {
    en: enLocale,
    ar: arLocale as typeof enLocale,
};

// Context types
interface I18nContextType {
    locale: Locale;
    direction: Direction;
    setLocale: (locale: Locale) => void;
    t: (key: string, params?: Record<string, string | number>) => string;
    formatNumber: (num: number) => string;
    formatDate: (date: Date, options?: Intl.DateTimeFormatOptions) => string;
    formatRelativeTime: (date: Date) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Helper to get nested value from object by dot notation path
const getNestedValue = (obj: Record<string, unknown>, path: string): string | undefined => {
    const keys = path.split('.');
    let result: unknown = obj;

    for (const key of keys) {
        if (result && typeof result === 'object' && key in result) {
            result = (result as Record<string, unknown>)[key];
        } else {
            return undefined;
        }
    }

    return typeof result === 'string' ? result : undefined;
};

// Replace template variables {{variable}} with provided params
const interpolate = (str: string, params?: Record<string, string | number>): string => {
    if (!params) return str;

    return str.replace(/\{\{(\w+)\}\}/g, (_, key) => {
        return params[key]?.toString() ?? `{{${key}}}`;
    });
};

interface I18nProviderProps {
    children: ReactNode;
    defaultLocale?: Locale;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({
    children,
    defaultLocale = 'en',
}) => {
    const [locale, setLocaleState] = useState<Locale>(() => {
        // Try to get saved locale from localStorage
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('pathways-locale') as Locale;
            if (saved && LOCALE_CONFIG[saved]) {
                return saved;
            }
        }
        return defaultLocale;
    });

    const direction = LOCALE_CONFIG[locale].direction;

    const setLocale = useCallback((newLocale: Locale) => {
        setLocaleState(newLocale);
        localStorage.setItem('pathways-locale', newLocale);

        // Update document direction for RTL support
        document.documentElement.dir = LOCALE_CONFIG[newLocale].direction;
        document.documentElement.lang = newLocale;
    }, []);

    // Translation function
    const t = useCallback((key: string, params?: Record<string, string | number>): string => {
        const translation = getNestedValue(translations[locale] as unknown as Record<string, unknown>, key);

        if (!translation) {
            // Fallback to English if translation missing
            const fallback = getNestedValue(translations.en as unknown as Record<string, unknown>, key);
            console.warn(`Missing translation for key: ${key} in locale: ${locale}`);
            return fallback ? interpolate(fallback, params) : key;
        }

        return interpolate(translation, params);
    }, [locale]);

    // Format number according to locale
    const formatNumber = useCallback((num: number): string => {
        return new Intl.NumberFormat(LOCALE_CONFIG[locale].numberFormat).format(num);
    }, [locale]);

    // Format date according to locale
    const formatDate = useCallback((date: Date, options?: Intl.DateTimeFormatOptions): string => {
        const defaultOptions: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        };
        return new Intl.DateTimeFormat(
            LOCALE_CONFIG[locale].numberFormat,
            options ?? defaultOptions
        ).format(date);
    }, [locale]);

    // Format relative time (e.g., "2 days ago", "in 3 hours")
    const formatRelativeTime = useCallback((date: Date): string => {
        const now = new Date();
        const diffMs = date.getTime() - now.getTime();
        const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
        const diffHours = Math.round(diffMs / (1000 * 60 * 60));
        const diffMinutes = Math.round(diffMs / (1000 * 60));

        const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

        if (Math.abs(diffDays) > 0) {
            return rtf.format(diffDays, 'day');
        } else if (Math.abs(diffHours) > 0) {
            return rtf.format(diffHours, 'hour');
        } else {
            return rtf.format(diffMinutes, 'minute');
        }
    }, [locale]);

    // Update document direction on mount and locale change
    React.useEffect(() => {
        document.documentElement.dir = direction;
        document.documentElement.lang = locale;
    }, [direction, locale]);

    return (
        <I18nContext.Provider
            value={{
                locale,
                direction,
                setLocale,
                t,
                formatNumber,
                formatDate,
                formatRelativeTime,
            }}
        >
            {children}
        </I18nContext.Provider>
    );
};

// Hook to use i18n
export const useI18n = (): I18nContextType => {
    const context = useContext(I18nContext);
    if (!context) {
        throw new Error('useI18n must be used within an I18nProvider');
    }
    return context;
};

// HOC for components that need locale awareness without the full hook
export const withI18n = <P extends object>(
    WrappedComponent: React.ComponentType<P & { i18n: I18nContextType }>
) => {
    return (props: P) => {
        const i18n = useI18n();
        return <WrappedComponent {...props} i18n={i18n} />;
    };
};

export default I18nProvider;
