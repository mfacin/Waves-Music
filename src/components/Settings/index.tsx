import React, { ChangeEvent, useContext } from 'react'
import { Moon, Sun, X, VolumeX, Volume2 } from 'react-feather'
import Select from 'react-select'

import Slider from '../Slider'

import { AppContext } from '../../contexts/AppContext'
import { PlayerContext } from '../../contexts/PlayerContext'

import './styles.scss'

const Settings: React.FC = () => {
  const {
    isSettingsOpen,
    handleToggleSettingsOpen,
    isDarkMode,
    handleToggleDarkMode,
  } = useContext(AppContext)

  const {
    volume,
    handleVolumeChange,
    isMuted,
    handleMuteUnmute,
    shouldSkipToSongStart,
    handleChangeSkipToStart,
  } = useContext(PlayerContext)

  const options = [
    { value: 'skip-back', label: 'Skip to the previows song' },
    { value: 'music-start', label: "Skip to the song's start" },
  ]

  const handleSetDarkMode = (dark: boolean) => {
    if (isDarkMode === dark) return
    handleToggleDarkMode()
  }

  const handleRangeChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleVolumeChange(Number(e.target.value) / 100)
  }

  const handleSelectChange = (value: { value: string }) => {
    handleChangeSkipToStart(value.value === 'music-start')
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

          <div className="theme-changer">
            <button
              className={!isDarkMode ? 'active' : ''}
              onClick={() => handleSetDarkMode(false)}
            >
              <Sun />
              <span>Light</span>
            </button>

            <button
              className={isDarkMode ? 'active' : ''}
              onClick={() => handleSetDarkMode(true)}
            >
              <Moon />
              <span>Dark</span>
            </button>
          </div>
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

        <div className="setting">
          <h3>When previows button pressed</h3>

          <Select
            className={`settings-select ${isDarkMode ? 'dark' : ''}`}
            classNamePrefix="settings-select"
            options={options}
            value={shouldSkipToSongStart ? options[1] : options[0]}
            onChange={value => handleSelectChange(value as { value: string })}
            isSearchable={false}
          />
        </div>
      </div>
    </div>
  )
}

export default Settings
