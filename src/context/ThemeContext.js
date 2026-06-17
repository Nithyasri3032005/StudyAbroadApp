import React, {createContext, useState, useContext} from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const colors = isDarkMode
    ? {
        primary: '#667eea',
        secondary: '#764ba2',
        background: '#0f0f1e',
        surface: '#1a1a2e',
        card: '#16213e',
        text: '#ffffff',
        textSecondary: '#b0b0c0',
        border: '#2a2a4e',
        success: '#4CAF50',
        accent: '#f5576c',
      }
    : {
        primary: '#667eea',
        secondary: '#764ba2',
        background: '#f8f9fa',
        surface: '#ffffff',
        card: '#f5f7ff',
        text: '#222222',
        textSecondary: '#666666',
        border: '#e0e0e0',
        success: '#4CAF50',
        accent: '#f5576c',
      };

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <ThemeContext.Provider value={{isDarkMode, colors, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
