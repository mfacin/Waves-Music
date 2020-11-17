import React from 'react'
import { BookOpen, Book, Moon, Sun } from 'react-feather'

import './styles.scss'

interface NavProps {
  isLibraryOpen: boolean
  setIsLibraryOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Nav: React.FC<NavProps> = ({ isLibraryOpen, setIsLibraryOpen }) => {
  const handleOpenLibrary = () => {
    setIsLibraryOpen(prevState => !prevState)
  }

  return (
    <nav>
      <button onClick={handleOpenLibrary}>
        {isLibraryOpen ? <Book /> : <BookOpen />}
      </button>

      <h1>Waves Music</h1>

      <button>
        <Moon />
      </button>
    </nav>
  )
}

export default Nav
