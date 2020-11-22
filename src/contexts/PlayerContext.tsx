import React, { useCallback, useReducer } from 'react'

import { PlayerReducer, SkipDirection } from './PlayerReducer'

import { SongInt } from '../components/Song'

import data from '../data'

export interface PlayerState {
  songs: Array<SongInt>
  currentSong: SongInt
  currentSongIndex: number
  hasNext: boolean
  hasPreviows: boolean
  shouldSkipToSongStart: boolean
  shouldRepeat: boolean

  currentTime: number
  duration: number
  songPercentage: number
  isPlaying: boolean

  volume: number
  isMuted: boolean
}

interface PlayerContextInt extends PlayerState {
  handleChangeCurrentSong: (song: SongInt) => void
  handlePlayPauseSong: () => void
  handleChangeSongInfo: (time: number, duration: number) => void
  handleSkipTrack: (direction: SkipDirection) => void
  handleVolumeChange: (volume: number) => void
  handleMuteUnmute: () => void
  handleChangeSkipToStart: (skip: boolean) => void
  handleToggleRepeat: () => void
}

const initialState: PlayerState = {
  songs: data(),
  currentSong: data()[0],
  currentSongIndex: 0,
  hasNext: data()[1] !== undefined,
  hasPreviows: false,
  shouldSkipToSongStart: true,
  shouldRepeat: false,
  currentTime: 0,
  duration: 0,
  songPercentage: 0,
  isPlaying: false,
  volume: 0.5,
  isMuted: false,
}

export const PlayerContext = React.createContext<PlayerContextInt>(
  {} as PlayerContextInt
)

const PlayerProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(PlayerReducer, initialState)

  const handleChangeCurrentSong = useCallback((song: SongInt) => {
    dispatch({ type: 'CHANGE_CURRENT_SONG', song })
  }, [])

  const handlePlayPauseSong = useCallback(() => {
    dispatch({ type: 'TOGGLE_IS_PLAYING' })
  }, [])

  const handleChangeSongInfo = useCallback((time: number, duration: number) => {
    dispatch({ type: 'UPDATE_TIME', time, duration })
  }, [])

  const handleSkipTrack = useCallback((direction: SkipDirection) => {
    dispatch({ type: 'SKIP_SONG', direction })
  }, [])

  const handleVolumeChange = useCallback((volume: number) => {
    dispatch({ type: 'CHANGE_VOLUME', volume })
  }, [])

  const handleMuteUnmute = useCallback(() => {
    dispatch({ type: 'TOGGLE_IS_MUTED' })
  }, [])

  const handleToggleRepeat = useCallback(() => {
    dispatch({ type: 'TOGGLE_REPEAT' })
  }, [])

  const handleChangeSkipToStart = useCallback(
    (skip: boolean) => {
      if (skip === state.shouldSkipToSongStart) return

      dispatch({ type: 'CHANGE_SKIP_TO_START', skip })
    },
    [state.shouldSkipToSongStart]
  )

  return (
    <PlayerContext.Provider
      value={{
        ...state,
        handleChangeCurrentSong,
        handlePlayPauseSong,
        handleChangeSongInfo,
        handleSkipTrack,
        handleVolumeChange,
        handleMuteUnmute,
        handleChangeSkipToStart,
        handleToggleRepeat,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}

export default PlayerProvider
export { SkipDirection }
