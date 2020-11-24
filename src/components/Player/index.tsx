import React, {
  useEffect,
  useRef,
  SyntheticEvent,
  BaseSyntheticEvent,
  ChangeEvent,
  useContext,
} from 'react'
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
} from 'react-feather'

import { PlayerContext, SkipDirection } from '../../contexts/PlayerContext'

import timeFormater from '../../utils/timeFormater'
import Slider from '../Slider'

import './styles.scss'

const Player: React.FC = () => {
  const {
    currentSong,
    hasNext,
    hasPreviows,
    currentTime,
    duration,
    songPercentage,
    isPlaying,
    handlePlayPauseSong,
    handleChangeSongInfo,
    handleSkipTrack,
    volume,
    isMuted,
    shouldSkipToSongStart,
    shouldRepeat,
    handleToggleRepeat,
    isShuffle,
    handleShuffle,
  } = useContext(PlayerContext)

  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (!audioRef.current) return

    audioRef.current.src = currentSong.audio
  }, [currentSong])

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play()
    } else {
      audioRef.current?.pause()
    }
  }, [currentSong, isPlaying])

  useEffect(() => {
    if (!audioRef.current) return

    audioRef.current.volume = volume
  }, [volume])

  useEffect(() => {
    if (!audioRef.current) return

    audioRef.current.muted = isMuted
  }, [isMuted])

  const handleTimeUpdate = (e: SyntheticEvent<HTMLAudioElement>) => {
    const {
      target: { currentTime, duration },
    } = e as BaseSyntheticEvent

    handleChangeSongInfo(currentTime, isNaN(duration) ? 0 : duration)
  }

  const handleRangeChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current?.currentTime && audioRef.current?.currentTime !== 0)
      return

    const time = Number(e.target.value)

    handleChangeSongInfo(time, duration)

    audioRef.current.currentTime = time
  }

  return (
    <div className="player">
      <div className="time-control">
        <p>{timeFormater(currentTime)}</p>

        <Slider
          colors={currentSong.color}
          percentage={songPercentage}
          min={0}
          max={duration}
          value={currentTime}
          onChange={handleRangeChange}
        />

        <p>{timeFormater(duration)}</p>
      </div>

      <div className="play-control">
        <button onClick={handleShuffle} className={isShuffle ? 'active' : ''}>
          <Shuffle size={25} strokeWidth={1.5} />
        </button>

        <button
          disabled={
            shouldRepeat
              ? false
              : currentTime >= 5 && shouldSkipToSongStart
              ? false
              : !hasPreviows
          }
          onClick={() => handleSkipTrack(SkipDirection.BACK)}
        >
          <SkipBack size={30} strokeWidth={1.5} />
        </button>

        <button disabled={!duration} onClick={handlePlayPauseSong}>
          {isPlaying ? (
            <Pause size={40} strokeWidth={1.5} />
          ) : (
            <Play size={40} strokeWidth={1.5} />
          )}
        </button>

        <button
          disabled={shouldRepeat ? false : !hasNext}
          onClick={() => handleSkipTrack(SkipDirection.FORWARD)}
        >
          <SkipForward size={30} strokeWidth={1.5} />
        </button>

        <button
          className={shouldRepeat ? 'active' : ''}
          onClick={handleToggleRepeat}
        >
          <Repeat size={25} strokeWidth={1.5} />
        </button>
      </div>
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        onEnded={() => handleSkipTrack(SkipDirection.FORWARD)}
      ></audio>
    </div>
  )
}

export default Player
