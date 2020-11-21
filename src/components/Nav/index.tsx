import React, { useContext } from 'react'
import { BookOpen, Book, Moon, Sun } from 'react-feather'

import { AppContext } from '../../contexts/AppContext'

import './styles.scss'

const Nav: React.FC = () => {
  const {
    isDarkMode,
    handleToggleDarkMode,
    isLibraryOpen,
    handleToggleLibraryOpen,
  } = useContext(AppContext)

  const handleChangeDarkMode = () => {
    const newColor = isDarkMode ? '#d9efff' : '#28475d'
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', newColor)

    handleToggleDarkMode()
  }

  return (
    <nav>
      <button onClick={handleToggleLibraryOpen}>
        {isLibraryOpen ? <Book /> : <BookOpen />}
      </button>

      <h1>Waves Music</h1>

      <button onClick={handleChangeDarkMode}>
        {isDarkMode ? <Sun /> : <Moon />}
      </button>
    </nav>
  )
}

export default Nav
