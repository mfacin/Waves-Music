import React, {
  useState,
  useEffect,
  useRef,
  SyntheticEvent,
  BaseSyntheticEvent,
  ChangeEvent,
} from 'react'
import { Play, Pause, SkipBack, SkipForward } from 'react-feather'

import timeFormater from '../../utils/timeFormater'
import { SongInt } from '../Song'

import './styles.scss'

interface PlayerProps {
  currentSong: SongInt
  setCurrentSong: React.Dispatch<React.SetStateAction<SongInt>>
  isPlaying: boolean
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
  songs: Array<SongInt>
}

interface SongInfoInt {
  currentTime: number
  duration: number
}

enum SkipDirection {
  BACK = -1,
  FORWARD = 1,
}

const Player: React.FC<PlayerProps> = ({
  currentSong,
  setCurrentSong,
  songs,
  isPlaying,
  setIsPlaying,
}) => {
  const [songInfo, setSongInfo] = useState<SongInfoInt>({
    currentTime: 0,
    duration: 0,
  })
  const [percentage, setPercentage] = useState(0)

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

  useEffect(() => {
    // calculate percentage
    const roundedCurrent = Math.floor(Number(songInfo.currentTime))
    const roundedDuration = Math.floor(songInfo.duration)
    const newPercentage = Math.floor((roundedCurrent / roundedDuration) * 100)

    setPercentage(newPercentage)
  }, [songInfo])

  const findSongIndex = () =>
    songs.findIndex(song => song.id === currentSong.id)

  const handlePlayPauseSong = () => {
    if (!songInfo.duration) return

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

  const handleSkipTrack = (direction: SkipDirection) => {
    const currentSongIndex = findSongIndex()

    const newSong = songs[currentSongIndex + direction]

    if (!newSong && direction === SkipDirection.FORWARD) {
      setIsPlaying(false)
      return
    }

    if (!newSong) return

    setCurrentSong(newSong)
  }

  return (
    <div className="player">
      <div className="time-control">
        <p>{timeFormater(songInfo.currentTime)}</p>

        <div className="track">
          <input
            min={0}
            max={songInfo.duration}
            value={songInfo.currentTime}
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

        <p>{timeFormater(songInfo.duration)}</p>
      </div>

      <div className="play-control">
        <button onClick={() => handleSkipTrack(SkipDirection.BACK)}>
          <SkipBack
            className={`skip-back ${
              !songs[findSongIndex() - 1] ? 'disabled' : ''
            }`}
            size={30}
            strokeWidth={1.5}
          />
        </button>

        <button onClick={handlePlayPauseSong}>
          {isPlaying ? (
            <Pause
              className={`pause ${
                !songs[findSongIndex() - 1] ? 'disabled' : ''
              }`}
              size={40}
              strokeWidth={1.5}
            />
          ) : (
            <Play
              className={`play ${
                !songs[findSongIndex() - 1] ? 'disabled' : ''
              }`}
              size={40}
              strokeWidth={1.5}
            />
          )}
        </button>

        <button onClick={() => handleSkipTrack(SkipDirection.FORWARD)}>
          <SkipForward
            className={`skip-forward ${
              !songs[findSongIndex() - 1] ? 'disabled' : ''
            }`}
            size={30}
            strokeWidth={1.5}
          />
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
