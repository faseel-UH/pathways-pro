import React from 'react';
import { useI18n, LOCALE_CONFIG, Locale } from '../../i18n';
import './LanguageSwitcher.css';

interface LanguageSwitcherProps {
    variant?: 'default' | 'compact' | 'dropdown';
    className?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
    variant = 'default',
    className = '',
}) => {
    const { locale, setLocale } = useI18n();
    const [isOpen, setIsOpen] = React.useState(false);

    const locales = Object.entries(LOCALE_CONFIG) as [Locale, typeof LOCALE_CONFIG['en']][];

    const handleLocaleChange = (newLocale: Locale) => {
        setLocale(newLocale);
        setIsOpen(false);
    };

    if (variant === 'compact') {
        return (
            <div className={`language-switcher language-switcher--compact ${className}`}>
                {locales.map(([code, config]) => (
                    <button
                        key={code}
                        className={`language-switcher__btn ${locale === code ? 'active' : ''}`}
                        onClick={() => handleLocaleChange(code)}
                        aria-label={`Switch to ${config.name}`}
                        title={config.nativeName}
                    >
                        {code.toUpperCase()}
                    </button>
                ))}
            </div>
        );
    }

    if (variant === 'dropdown') {
        const currentConfig = LOCALE_CONFIG[locale];

        return (
            <div className={`language-switcher language-switcher--dropdown ${className}`}>
                <button
                    className="language-switcher__trigger"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-expanded={isOpen}
                    aria-haspopup="listbox"
                >
                    <span className="language-switcher__globe">🌐</span>
                    <span className="language-switcher__current">{currentConfig.nativeName}</span>
                    <span className={`language-switcher__arrow ${isOpen ? 'open' : ''}`}>▼</span>
                </button>

                {isOpen && (
                    <>
                        <div className="language-switcher__backdrop" onClick={() => setIsOpen(false)} />
                        <ul className="language-switcher__menu" role="listbox">
                            {locales.map(([code, config]) => (
                                <li key={code}>
                                    <button
                                        className={`language-switcher__option ${locale === code ? 'active' : ''}`}
                                        onClick={() => handleLocaleChange(code)}
                                        role="option"
                                        aria-selected={locale === code}
                                    >
                                        <span className="language-switcher__option-name">{config.nativeName}</span>
                                        <span className="language-switcher__option-label">{config.name}</span>
                                        {locale === code && <span className="language-switcher__check">✓</span>}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </div>
        );
    }

    // Default variant - pill buttons
    return (
        <div className={`language-switcher ${className}`}>
            {locales.map(([code, config]) => (
                <button
                    key={code}
                    className={`language-switcher__pill ${locale === code ? 'active' : ''}`}
                    onClick={() => handleLocaleChange(code)}
                    aria-label={`Switch to ${config.name}`}
                >
                    <span className="language-switcher__native">{config.nativeName}</span>
                </button>
            ))}
        </div>
    );
};

export default LanguageSwitcher;
