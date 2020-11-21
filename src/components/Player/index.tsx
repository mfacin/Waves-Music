import React, {
  useEffect,
  useRef,
  SyntheticEvent,
  BaseSyntheticEvent,
  ChangeEvent,
  useContext,
} from 'react'
import { Play, Pause, SkipBack, SkipForward } from 'react-feather'

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
  } = useContext(PlayerContext)

  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play()
    } else {
      audioRef.current?.pause()
    }
  }, [currentSong, isPlaying])

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume
  }, [volume])

  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = isMuted
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
        <button
          disabled={!hasPreviows}
          onClick={() => handleSkipTrack(SkipDirection.BACK)}
        >
          <SkipBack className="skip-back" size={30} strokeWidth={1.5} />
        </button>

        <button disabled={!duration} onClick={handlePlayPauseSong}>
          {isPlaying ? (
            <Pause className="pause" size={40} strokeWidth={1.5} />
          ) : (
            <Play className="play" size={40} strokeWidth={1.5} />
          )}
        </button>

        <button
          disabled={!hasNext}
          onClick={() => handleSkipTrack(SkipDirection.FORWARD)}
        >
          <SkipForward className="skip-forward" size={30} strokeWidth={1.5} />
        </button>
      </div>
      <audio
        ref={audioRef}
        src={currentSong.audio}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        onEnded={() => handleSkipTrack(SkipDirection.FORWARD)}
      ></audio>
    </div>
  )
}

export default Player
