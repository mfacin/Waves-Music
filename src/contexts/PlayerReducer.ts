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
      if (!state.hasNext && action.direction === SkipDirection.FORWARD) {
        return { ...state, isPlaying: false }
      }

      if (!state.hasPreviows && action.direction === SkipDirection.BACK) {
        return state
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
    default:
      return state
  }
}
