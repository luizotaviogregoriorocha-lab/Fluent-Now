"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type UserPreferences = {
    goal: string;
    level: string;
    time: string;
};

type UserProgress = {
    streak: number;
    totalMinutes: number;
    accuracy: number;
    xp: number;
    lessonsCompleted: number;
};

type UserContextType = {
    preferences: UserPreferences;
    progress: UserProgress;
    setPreferences: (prefs: UserPreferences) => void;
    updateProgress: (newProgress: Partial<UserProgress>) => void;
    hasCompletedOnboarding: boolean;
    completeOnboarding: () => void;
};

const defaultPreferences: UserPreferences = {
    goal: "",
    level: "",
    time: "",
};

const defaultProgress: UserProgress = {
    streak: 0,
    totalMinutes: 0,
    accuracy: 0,
    xp: 0,
    lessonsCompleted: 0,
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [preferences, setPreferencesState] = useState<UserPreferences>(defaultPreferences);
    const [progress, setProgressState] = useState<UserProgress>(defaultProgress);
    const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from LocalStorage on mount
    useEffect(() => {
        const savedPrefs = localStorage.getItem("fluent_preferences");
        const savedProgress = localStorage.getItem("fluent_progress");
        const savedOnboarding = localStorage.getItem("fluent_onboarding_complete");

        if (savedPrefs) setPreferencesState(JSON.parse(savedPrefs));
        if (savedProgress) setProgressState(JSON.parse(savedProgress));
        if (savedOnboarding === "true") setHasCompletedOnboarding(true);

        setIsLoaded(true);
    }, []);

    // Save to LocalStorage whenever state changes
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("fluent_preferences", JSON.stringify(preferences));
        }
    }, [preferences, isLoaded]);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("fluent_progress", JSON.stringify(progress));
        }
    }, [progress, isLoaded]);

    const setPreferences = (prefs: UserPreferences) => {
        setPreferencesState(prefs);
    };

    const updateProgress = (newProgress: Partial<UserProgress>) => {
        setProgressState(prev => ({ ...prev, ...newProgress }));
    };

    const completeOnboarding = () => {
        setHasCompletedOnboarding(true);
        localStorage.setItem("fluent_onboarding_complete", "true");
    };

    return (
        <UserContext.Provider value={{
            preferences,
            progress,
            setPreferences,
            updateProgress,
            hasCompletedOnboarding,
            completeOnboarding
        }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}
