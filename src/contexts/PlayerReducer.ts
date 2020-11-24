import React from 'react'
import { SongInt } from '../components/Song'
import { PlayerState } from './PlayerContext'
import localStorage from '../utils/localStorage'
import calculatePercentage from '../utils/calculatePercentage'
import shuffle from '../utils/shuffle'

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
  | {
      type: 'TOGGLE_SHUFFLE'
    }

export const PlayerReducer: React.Reducer<PlayerState, PlayerActionType> = (
  state: PlayerState,
  action: PlayerActionType
) => {
  const handleChangeSong = (index: number, song?: SongInt) => {
    return {
      ...state,
      queue: state.queue.map(s => ({
        ...s,
        active: song ? s.id === song.id : s.id === state.queue[index].id,
      })),
      currentSong: song ? { ...song, active: true } : state.queue[index],
      currentSongIndex: index,
      hasNext: state.isShuffle
        ? state.queue[index + 1] !== undefined
        : state.songs[index + 1] !== undefined,
      hasPreviows: state.isShuffle
        ? state.queue[index - 1] !== undefined
        : state.songs[index - 1] !== undefined,
      songs: state.songs.map(s => ({
        ...s,
        active: song ? s.id === song.id : s.id === state.queue[index].id,
      })),
      duration: 0,
      currentTime: 0,
      songPercentage: 0,
    }
  }

  console.log(action.type)

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
      localStorage.set('volume', action.volume)

      return {
        ...state,
        volume: action.volume,
      }
    case 'TOGGLE_IS_MUTED':
      localStorage.set('isMuted', !state.isMuted)

      return {
        ...state,
        isMuted: !state.isMuted,
      }
    case 'TOGGLE_REPEAT':
      localStorage.set('shouldRepeat', !state.shouldRepeat)

      return {
        ...state,
        shouldRepeat: !state.shouldRepeat,
      }
    case 'CHANGE_SKIP_TO_START':
      localStorage.set('shouldSkipToSongStart', action.skip)

      return {
        ...state,
        shouldSkipToSongStart: action.skip,
      }
    case 'TOGGLE_SHUFFLE':
      let newQueue

      if (state.isShuffle) {
        newQueue = state.songs
      } else {
        const queueWithoutCurrentSong = state.queue.filter(song => !song.active)
        queueWithoutCurrentSong.unshift(state.currentSong)
        newQueue = shuffle(queueWithoutCurrentSong)
      }

      const index = state.songs.findIndex(
        song => song.id === state.currentSong.id
      )

      localStorage.set('isShuffle', !state.isShuffle)

      return {
        ...state,
        isShuffle: !state.isShuffle,
        queue: state.isShuffle ? state.songs : newQueue,
        currentSongIndex: state.isShuffle ? index : 0,
        hasNext: state.isShuffle
          ? state.songs[index + 1] !== undefined
          : newQueue[1] !== undefined,
        hasPreviows: state.isShuffle
          ? state.songs[index - 1] !== undefined
          : false,
      }
    default:
      return state
  }
}
