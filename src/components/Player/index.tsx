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

import './styles.scss'

const Player: React.FC = () => {
  const {
    currentSong,
    hasNext,
    hasPreviows,
    currentTime,
    duration,
    percentage,
    isPlaying,
    handlePlayPauseSong,
    handleChangeSongInfo,
    handleSkipTrack,
  } = useContext(PlayerContext)

  const audioRef = useRef<HTMLAudioElement>(null)

  // play/pause the song when the state changes
  // keep playing when the current song changes
  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play()
    } else {
      audioRef.current?.pause()
    }
  }, [currentSong, isPlaying])

  // update the range information with the current time
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

        <div className="track">
          <input
            min={0}
            max={duration}
            value={currentTime}
            onChange={handleRangeChange}
            type="range"
          />

          <div
            className="animate-track-container"
            style={{
              background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
            }}
          >
            <div
              className="animate-track"
              style={{ transform: `translateX(${percentage}%)` }}
            ></div>
          </div>
        </div>

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
