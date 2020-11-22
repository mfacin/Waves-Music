import React from 'react'
import { SongInt } from '../components/Song'
import { PlayerState } from './PlayerContext'

export enum SkipDirection {
  BACK = -1,
  FORWARD = 1,
}

type PlayerActionType =
  | {
      type: 'CHANGE_CURRENT_SONG'
      song: SongInt
    }
  | {
      type: 'UPDATE_TIME'
      time: number
      duration: number
    }
  | {
      type: 'TOGGLE_IS_PLAYING'
    }
  | {
      type: 'SKIP_SONG'
      direction: SkipDirection
    }
  | {
      type: 'CHANGE_VOLUME'
      volume: number
    }
  | {
      type: 'TOGGLE_IS_MUTED'
    }
  | {
      type: 'TOGGLE_REPEAT'
    }
  | {
      type: 'CHANGE_SKIP_TO_START'
      skip: boolean
    }

const calculatePercentage = (currentTime: number, duration: number) => {
  const roundedCurrent = Math.floor(Number(currentTime))
  const roundedDuration = Math.floor(duration)
  const newPercentage = Math.floor((roundedCurrent / roundedDuration) * 100)

  return newPercentage
}

export const PlayerReducer: React.Reducer<PlayerState, PlayerActionType> = (
  state: PlayerState,
  action: PlayerActionType
) => {
  const handleChangeSong = (index: number, song?: SongInt) => {
    return {
      ...state,
      currentSong: song ? { ...song, active: true } : state.songs[index],
      currentSongIndex: index,
      hasNext: state.songs[index + 1] !== undefined,
      hasPreviows: state.songs[index - 1] !== undefined,
      songs: state.songs.map(s => ({
        ...s,
        active: song ? s.id === song.id : s.id === state.songs[index].id,
      })),
      duration: 0,
      currentTime: 0,
      songPercentage: 0,
    }
  }

  switch (action.type) {
    case 'CHANGE_CURRENT_SONG':
      const songIndex = state.songs.findIndex(
        song => song.id === action.song.id
      )

      return handleChangeSong(songIndex, action.song)
    case 'UPDATE_TIME':
      return {
        ...state,
        currentTime: action.time,
        duration: action.duration,
        songPercentage: calculatePercentage(action.time, action.duration),
      }
    case 'TOGGLE_IS_PLAYING':
      if (!state.duration) return state

      return {
        ...state,
        isPlaying: !state.isPlaying,
      }
    case 'SKIP_SONG':
      if (action.direction === SkipDirection.FORWARD) {
        if (!state.hasNext && state.shouldRepeat) {
          return handleChangeSong(0)
        }

        if (!state.hasNext) {
          return { ...state, isPlaying: false }
        }
      }

      if (action.direction === SkipDirection.BACK) {
        if (state.shouldSkipToSongStart && state.currentTime >= 5) {
          console.log('oi')
          return handleChangeSong(state.currentSongIndex)
        }

        if (state.shouldRepeat) {
          return handleChangeSong(state.songs.length - 1)
        }

        if (!state.hasPreviows) {
          return state
        }
      }

      return handleChangeSong(state.currentSongIndex + action.direction)
    case 'CHANGE_VOLUME':
      return {
        ...state,
        volume: action.volume,
      }
    case 'TOGGLE_IS_MUTED':
      return {
        ...state,
        isMuted: !state.isMuted,
      }
    case 'TOGGLE_REPEAT':
      return {
        ...state,
        shouldRepeat: !state.shouldRepeat,
      }
    case 'CHANGE_SKIP_TO_START':
      return {
        ...state,
        shouldSkipToSongStart: action.skip,
      }
    default:
      return state
  }
}
