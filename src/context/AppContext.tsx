import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Types
export type Persona = 'sniper' | 'explorer' | 'strategist' | null;
export type OnboardingVector = 'school-code' | 'magic-link' | 'wonde' | 'b2c' | null;

export interface UserProfile {
    name: string;
    email: string;
    school: string | null;
    grade: string | null;
    curriculum: string | null;
    location: string | null;
    parentEmail: string | null;
}

export interface CareerTarget {
    discipline: string | null;
    universities: string[];
}

export interface AppState {
    // Onboarding
    onboardingVector: OnboardingVector;
    isAuthenticated: boolean;
    persona: Persona;

    // User Profile
    userProfile: UserProfile;

    // Career Target (for Sniper/Strategist)
    careerTarget: CareerTarget;

    // Explorer data
    explorerArchetype: string | null;
    explorerDomains: string[];

    // Strategist data
    strategistComparison: [string, string] | null;
    strategistChoice: string | null;

    // Dashboard
    currentDashboardTab: 'checklist' | 'timeline' | 'weekly' | 'milestones';
}

interface AppContextType {
    state: AppState;
    setOnboardingVector: (vector: OnboardingVector) => void;
    setAuthenticated: (auth: boolean) => void;
    setPersona: (persona: Persona) => void;
    updateUserProfile: (updates: Partial<UserProfile>) => void;
    setCareerTarget: (target: Partial<CareerTarget>) => void;
    setExplorerArchetype: (archetype: string) => void;
    setExplorerDomains: (domains: string[]) => void;
    setStrategistComparison: (comparison: [string, string]) => void;
    setStrategistChoice: (choice: string) => void;
    setDashboardTab: (tab: AppState['currentDashboardTab']) => void;
    resetState: () => void;
    login: (profile: UserProfile) => void;
}


const initialState: AppState = {
    onboardingVector: null,
    isAuthenticated: false,
    persona: null,
    userProfile: {
        name: '',
        email: '',
        school: null,
        grade: null,
        curriculum: null,
        location: null,
        parentEmail: null,
    },
    careerTarget: {
        discipline: null,
        universities: [],
    },
    explorerArchetype: null,
    explorerDomains: [],
    strategistComparison: null,
    strategistChoice: null,
    currentDashboardTab: 'checklist',
};

const STORAGE_KEY = 'pathways_pro_state_v1';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Initialize state from localStorage if available
    const [state, setState] = useState<AppState>(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                return JSON.parse(saved);
            }
        } catch (e) {
            console.error('Failed to load state', e);
        }
        return initialState;
    });

    // Save state to localStorage whenever it changes
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (e) {
            console.error('Failed to save state', e);
        }
    }, [state]);

    const setOnboardingVector = (vector: OnboardingVector) => {
        setState(prev => ({ ...prev, onboardingVector: vector }));
    };

    const setAuthenticated = (auth: boolean) => {
        setState(prev => ({ ...prev, isAuthenticated: auth }));
    };

    const setPersona = (persona: Persona) => {
        setState(prev => ({ ...prev, persona }));
    };

    const updateUserProfile = (updates: Partial<UserProfile>) => {
        setState(prev => ({
            ...prev,
            userProfile: { ...prev.userProfile, ...updates },
        }));
    };

    const setCareerTarget = (target: Partial<CareerTarget>) => {
        setState(prev => ({
            ...prev,
            careerTarget: { ...prev.careerTarget, ...target },
        }));
    };

    const setExplorerArchetype = (archetype: string) => {
        setState(prev => ({ ...prev, explorerArchetype: archetype }));
    };

    const setExplorerDomains = (domains: string[]) => {
        setState(prev => ({ ...prev, explorerDomains: domains }));
    };

    const setStrategistComparison = (comparison: [string, string]) => {
        setState(prev => ({ ...prev, strategistComparison: comparison }));
    };

    const setStrategistChoice = (choice: string) => {
        setState(prev => ({ ...prev, strategistChoice: choice }));
    };

    const setDashboardTab = (tab: AppState['currentDashboardTab']) => {
        setState(prev => ({ ...prev, currentDashboardTab: tab }));
    };

    const resetState = () => {
        setState(initialState);
        localStorage.removeItem(STORAGE_KEY);
    };

    const login = (profile: UserProfile) => {
        setState(prev => ({
            ...prev,
            userProfile: profile,
            isAuthenticated: true,
            onboardingVector: 'b2c',
        }));
    };

    return (
        <AppContext.Provider
            value={{
                state,
                setOnboardingVector,
                setAuthenticated,
                setPersona,
                updateUserProfile,
                setCareerTarget,
                setExplorerArchetype,
                setExplorerDomains,
                setStrategistComparison,
                setStrategistChoice,
                setDashboardTab,
                resetState,
                login,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useApp = (): AppContextType => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
};
