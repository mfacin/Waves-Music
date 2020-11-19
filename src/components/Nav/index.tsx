import React from 'react'
import { BookOpen, Book, Moon, Sun } from 'react-feather'

import './styles.scss'

interface NavProps {
  isLibraryOpen: boolean
  setIsLibraryOpen: React.Dispatch<React.SetStateAction<boolean>>
  isDarkMode: boolean
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>
}

const Nav: React.FC<NavProps> = ({
  isLibraryOpen,
  setIsLibraryOpen,
  isDarkMode,
  setIsDarkMode,
}) => {
  const handleOpenLibrary = () => {
    setIsLibraryOpen(prevState => !prevState)
  }

  const handleChangeDarkMode = () => {
    const newColor = isDarkMode ? '#d9efff' : '#28475d'
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', newColor)

    setIsDarkMode(prevState => !prevState)
  }

  return (
    <nav>
      <button onClick={handleOpenLibrary}>
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
