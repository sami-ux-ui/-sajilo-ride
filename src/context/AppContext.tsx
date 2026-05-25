'use client';

import React, { createContext, useContext, useState } from 'react';

// 1. Create the context with a default safe value
const AppContext = createContext<{
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
} | null>(null);

// 2. Export the wrapper component that manages the state
export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
}

// 3. Export the custom hook to safely read the context values
export function useAppContext() {
  const context = useContext(AppContext);
  return context;
}
