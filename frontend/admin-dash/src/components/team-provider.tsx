'use client'

import { createContext, useContext, useState } from "react";

// Define the type for the team context values
type TeamContextVals = {
    activeTeamId: number ,
    activeTeamName: string ,
    setActiveTeam: (id: number, name: string) => void,
};

// Default values for the team context
const defaults: TeamContextVals = {
    activeTeamId: Infinity,
    activeTeamName: '',
    setActiveTeam: () => {},
};

// Create the team context with default values
const TeamContext = createContext(defaults);

// The TeamProvider component wraps the application and provides team context
export function TeamProvider({ children }: { children: React.ReactNode }) {
    const [activeTeamId, setActiveTeamId] = useState<number>(Infinity);
    const [activeTeamName, setActiveTeamName] = useState<string>('');

    // Function to set the active team
    const setActiveTeam = (id: number, name: string) => {
        setActiveTeamId(id);
        setActiveTeamName(name);
    };

    return (
        <TeamContext.Provider value={{ activeTeamId, activeTeamName, setActiveTeam }}>
            {children}
        </TeamContext.Provider>
    );
}

// Custom hook to use the team context
export const useTeam = () => useContext(TeamContext);