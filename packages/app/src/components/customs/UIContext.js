import React, { createContext, useContext, useState } from 'react';

// Create a context with default values and an updater function
const UIContext = createContext({
  hideHeader: false,
  setHideHeader: () => {},
});

// Hook to use the UI context
export const useUIContext = () => useContext(UIContext);

// Provider component that wraps your application or part of it
export const UIProvider = ({ children }) => {
  const [hideHeader, setHideHeader] = useState(false);

  return (
    <UIContext.Provider value={{ hideHeader, setHideHeader }}>
      {children}
    </UIContext.Provider>
  );
};
