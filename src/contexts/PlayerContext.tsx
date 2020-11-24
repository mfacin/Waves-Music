import React, { useCallback, useReducer } from 'react'

import { PlayerReducer, SkipDirection } from './PlayerReducer'

import { SongInt } from '../components/Song'

import data from '../data'
import localStorage from '../utils/localStorage'

const parsedData = data()

export interface PlayerState {
  songs: Array<SongInt>
  queue: Array<SongInt>
  currentSong: SongInt
  currentSongIndex: number
  hasNext: boolean
  hasPreviows: boolean
  shouldSkipToSongStart: boolean
  shouldRepeat: boolean
  isShuffle: boolean

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
  handleShuffle: () => void
}

const initialState: PlayerState = {
  songs: parsedData,
  queue: parsedData,
  currentSong: parsedData[0],
  currentSongIndex: 0,
  hasNext: parsedData[1] !== undefined,
  hasPreviows: false,
  shouldSkipToSongStart: localStorage.get('shouldSkipToSongStart', true),
  shouldRepeat: localStorage.get('shouldRepeat', false),
  isShuffle: localStorage.get('isShuffle', false),
  currentTime: 0,
  duration: 0,
  songPercentage: 0,
  isPlaying: false,
  volume: localStorage.get('volume', 0.5),
  isMuted: localStorage.get('isMuted', false),
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

  const handleShuffle = useCallback(() => {
    dispatch({ type: 'TOGGLE_SHUFFLE' })
  }, [])

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
        handleShuffle,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}

export default PlayerProvider
export { SkipDirection }
