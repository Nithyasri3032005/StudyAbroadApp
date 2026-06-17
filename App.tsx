import React from 'react';
import AppNavigator from './src/navigation/AppNavigation';
import {ThemeProvider} from './src/context/ThemeContext';
import {FavoritesProvider} from './src/context/FavoritesContext';

function App() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <AppNavigator />
      </FavoritesProvider>
    </ThemeProvider>
  );
}

export default App;