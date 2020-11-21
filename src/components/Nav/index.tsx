import React, { useContext } from 'react'
import { BookOpen, Book, Settings } from 'react-feather'

import { AppContext } from '../../contexts/AppContext'

import './styles.scss'

const Nav: React.FC = () => {
  const {
    isLibraryOpen,
    handleToggleLibraryOpen,
    handleToggleSettingsOpen,
  } = useContext(AppContext)

  return (
    <nav>
      <button onClick={handleToggleLibraryOpen}>
        {isLibraryOpen ? <Book /> : <BookOpen />}
      </button>

      <h1>Waves Music</h1>

      <button onClick={handleToggleSettingsOpen}>
        <Settings />
      </button>
    </nav>
  )
}

export default Nav
