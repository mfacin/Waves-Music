import React, { ChangeEvent, useContext } from 'react'

import { AppContext } from '../../contexts/AppContext'
import { Moon, Sun, X, VolumeX, Volume2 } from 'react-feather'

import './styles.scss'
import Slider from '../Slider'
import { PlayerContext } from '../../contexts/PlayerContext'

const Settings: React.FC = () => {
  const {
    isSettingsOpen,
    handleToggleSettingsOpen,
    isDarkMode,
    handleToggleDarkMode,
  } = useContext(AppContext)

  const { volume, handleVolumeChange, isMuted, handleMuteUnmute } = useContext(
    PlayerContext
  )

  const handleRangeChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleVolumeChange(Number(e.target.value) / 100)
  }

  return (
    <div className={`panel right ${isSettingsOpen ? 'open' : ''}`}>
      <div className="title">
        <h2>Settings</h2>
        <button onClick={handleToggleSettingsOpen}>
          <X />
        </button>
      </div>

      <div className="settings">
        <div className="setting">
          <h3>Theme</h3>

          <button onClick={handleToggleDarkMode}>
            {isDarkMode ? <Sun /> : <Moon />}
          </button>
        </div>

        <div className="setting">
          <h3>Volume</h3>

          <div className="volume-slider">
            <button className="small" onClick={handleMuteUnmute}>
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>

            <Slider
              percentage={volume * 100}
              min={0}
              max={100}
              value={volume * 100}
              onChange={handleRangeChange}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
