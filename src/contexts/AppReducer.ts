import React from 'react'
import { AppState } from './AppContext'
import localStorage from '../utils/localStorage'

type AppActionType = {
  type: 'TOGGLE_DARK_MODE' | 'TOGGLE_LIBRARY_OPEN' | 'TOGGLE_SETTINGS_OPEN'
}

export const AppReducer: React.Reducer<AppState, AppActionType> = (
  state: AppState,
  action: AppActionType
) => {
  switch (action.type) {
    case 'TOGGLE_DARK_MODE':
      localStorage.set('isDarkMode', !state.isDarkMode)

      return {
        ...state,
        isDarkMode: !state.isDarkMode,
      }
    case 'TOGGLE_LIBRARY_OPEN':
      return {
        ...state,
        isLibraryOpen: !state.isLibraryOpen,
      }
    case 'TOGGLE_SETTINGS_OPEN':
      return {
        ...state,
        isSettingsOpen: !state.isSettingsOpen,
      }
    default:
      return state
  }
}
