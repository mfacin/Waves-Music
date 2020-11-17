import React, {
  useState,
  useRef,
  SyntheticEvent,
  BaseSyntheticEvent,
  ChangeEvent,
  useEffect,
} from 'react'
import { Play, Pause, ArrowLeft, ArrowRight } from 'react-feather'

import timeFormater from '../../utils/timeFormater'
import { SongInt } from '../Song'

import './styles.scss'

interface PlayerProps {
  currentSong: SongInt
  isPlaying: boolean
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
}

interface SongInfoInt {
  currentTime: number
  duration: number
}

const Player: React.FC<PlayerProps> = ({
  currentSong,
  isPlaying,
  setIsPlaying,
}) => {
  const [songInfo, setSongInfo] = useState<SongInfoInt>({
    currentTime: 0,
    duration: 0,
  })

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

  const handlePlayPauseSong = () => {
    setIsPlaying(prevState => !prevState)
  }

  // update the range information with the current time
  const handleTimeUpdate = (e: SyntheticEvent<HTMLAudioElement>) => {
    const {
      target: { currentTime, duration },
    } = e as BaseSyntheticEvent

    setSongInfo(prevState => ({
      ...prevState,
      duration: isNaN(duration) ? 0 : duration,
      currentTime,
    }))
  }

  const handleRangeChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current?.currentTime && audioRef.current?.currentTime !== 0)
      return

    const currentTime = Number(e.target.value)

    setSongInfo(prevState => ({ ...prevState, currentTime }))
    audioRef.current.currentTime = currentTime
  }

  return (
    <div className="player">
      <div className="time-control">
        <p>{timeFormater(songInfo.currentTime)}</p>
        <input
          min={0}
          max={songInfo.duration}
          value={songInfo.currentTime}
          onChange={handleRangeChange}
          type="range"
        />
        <p>{timeFormater(songInfo.duration)}</p>
      </div>
      <div className="play-control">
        <ArrowLeft
          className="skip-back"
          size={30}
          strokeWidth={1.5}
          color="#262f42"
        />

        {isPlaying ? (
          <Pause
            onClick={handlePlayPauseSong}
            className="pause"
            size={40}
            strokeWidth={1.5}
            color="#262f42"
          />
        ) : (
          <Play
            onClick={handlePlayPauseSong}
            className="play"
            size={40}
            strokeWidth={1.5}
            color="#262f42"
          />
        )}

        <ArrowRight
          className="skip-forward"
          size={30}
          strokeWidth={1.5}
          color="#262f42"
        />
      </div>
      <audio
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </div>
  )
}

export default Player
