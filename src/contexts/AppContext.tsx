import React, { useCallback, useReducer } from 'react'
import { AppReducer } from './AppReducer'
import localStorage from '../utils/localStorage'

export interface AppState {
  isLibraryOpen: boolean
  isSettingsOpen: boolean
  isDarkMode: boolean
}

interface AppContextInt extends AppState {
  handleToggleDarkMode: () => void
  handleToggleLibraryOpen: () => void
  handleToggleSettingsOpen: () => void
}

const initialState: AppState = {
  isLibraryOpen: false,
  isSettingsOpen: false,
  isDarkMode: localStorage.get('isDarkMode', false),
}

export const AppContext = React.createContext<AppContextInt>(
  {} as AppContextInt
)

const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState)

  const handleToggleDarkMode = useCallback(() => {
    const newColor = state.isDarkMode ? '#d9efff' : '#28475d'
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', newColor)

    dispatch({ type: 'TOGGLE_DARK_MODE' })
  }, [state.isDarkMode])

  const handleToggleLibraryOpen = useCallback(() => {
    dispatch({ type: 'TOGGLE_LIBRARY_OPEN' })
  }, [])

  const handleToggleSettingsOpen = useCallback(() => {
    dispatch({ type: 'TOGGLE_SETTINGS_OPEN' })
  }, [])

  return (
    <AppContext.Provider
      value={{
        ...state,
        handleToggleDarkMode,
        handleToggleLibraryOpen,
        handleToggleSettingsOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
