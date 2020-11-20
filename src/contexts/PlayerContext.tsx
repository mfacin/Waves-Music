import React, { useCallback, useReducer } from 'react'
import { SongInt } from '../components/Song'

import data from '../data'

import { PlayerReducer, SkipDirection } from './PlayerReducer'

export interface PlayerState {
  songs: Array<SongInt>
  currentSong: SongInt
  currentSongIndex: number
  hasNext: boolean
  hasPreviows: boolean
  currentTime: number
  duration: number
  percentage: number
  isPlaying: boolean
}

interface PlayerContextInt extends PlayerState {
  handleChangeCurrentSong: (song: SongInt) => void
  handlePlayPauseSong: () => void
  handleChangeSongInfo: (time: number, duration: number) => void
  handleSkipTrack: (direction: SkipDirection) => void
}

const initialState: PlayerState = {
  songs: data(),
  currentSong: data()[0],
  currentSongIndex: 0,
  hasNext: data()[1] !== undefined,
  hasPreviows: false,
  currentTime: 0,
  duration: 0,
  percentage: 0,
  isPlaying: false,
}

const PlayerContext = React.createContext<PlayerContextInt>(
  {} as PlayerContextInt
)

const PlayerProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(PlayerReducer, initialState)

  const handleChangeCurrentSong = useCallback((song: SongInt) => {
    dispatch({ type: 'CHANGE_CURRENT_SONG', song })
  }, [])

  const handlePlayPauseSong = useCallback(() => {
    dispatch({ type: 'CHANGE_IS_PLAYING' })
  }, [])

  const handleChangeSongInfo = useCallback((time: number, duration: number) => {
    dispatch({ type: 'UPDATE_TIME', time, duration })
  }, [])

  const handleSkipTrack = (direction: SkipDirection) => {
    dispatch({ type: 'SKIP_SONG', direction })
  }

  return (
    <PlayerContext.Provider
      value={{
        ...state,
        handleChangeCurrentSong,
        handlePlayPauseSong,
        handleChangeSongInfo,
        handleSkipTrack,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}

export default PlayerProvider
export { PlayerContext, SkipDirection }
