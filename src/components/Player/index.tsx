import React, {
  useState,
  useRef,
  SyntheticEvent,
  BaseSyntheticEvent,
  ChangeEvent,
} from 'react'
import { Play, Pause, ArrowLeft, ArrowRight } from 'react-feather'

import timeFormater from '../../utils/timeFormater'
import { SongInt } from '../Song'

import './styles.scss'

interface PlayerProps {
  currentSong: SongInt
  isPlaying: boolean
  setIsPlaying: Function
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

  const handlePlayPauseSong = () => {
    if (isPlaying) {
      setIsPlaying(false)
      audioRef.current?.pause()
    } else {
      setIsPlaying(true)
      audioRef.current?.play()
    }
  }

  const handleTimeUpdate = (e: SyntheticEvent<HTMLAudioElement>) => {
    const {
      target: { currentTime, duration },
    } = e as BaseSyntheticEvent

    setSongInfo(prevState => ({ ...prevState, duration, currentTime }))
  }

  const handleRangeChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current?.currentTime) return

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
        <ArrowLeft className="skip-back" size={30} />

        {isPlaying ? (
          <Pause onClick={handlePlayPauseSong} className="pause" size={40} />
        ) : (
          <Play onClick={handlePlayPauseSong} className="play" size={40} />
        )}

        <ArrowRight className="skip-forward" size={30} />
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
