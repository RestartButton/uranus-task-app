'use client'

import { createContext, useContext, useState } from "react"

const GroupContext = createContext();

export function GroupProvider({ children }) {
    const [activeGroup, setActiveGroup] = useState(null);

    return (
        <GroupContext.Provider value={{ activeGroup, setActiveGroup }}>
            {children}
        </GroupContext.Provider>
    );
}

export function useGroup() {
    return useContext(GroupContext);
}