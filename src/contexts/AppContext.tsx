import React, { useCallback, useReducer } from 'react'
import { AppReducer } from './AppReducer'

export interface AppState {
  isLibraryOpen: boolean
  isDarkMode: boolean
}

interface AppContextInt extends AppState {
  handleToggleDarkMode: () => void
  handleToggleLibraryOpen: () => void
}

const initialState: AppState = {
  isLibraryOpen: false,
  isDarkMode: false,
}

export const AppContext = React.createContext<AppContextInt>(
  {} as AppContextInt
)

const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState)

  const handleToggleDarkMode = useCallback(() => {
    dispatch({ type: 'TOGGLE_DARK_MODE' })
  }, [])
  const handleToggleLibraryOpen = useCallback(() => {
    dispatch({ type: 'TOGGLE_LIBRARY_OPEN' })
  }, [])

  return (
    <AppContext.Provider
      value={{ ...state, handleToggleDarkMode, handleToggleLibraryOpen }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
