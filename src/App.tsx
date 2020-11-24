import React, { useContext } from 'react'
import { Heart } from 'react-feather'

import Library from './components/Library'
import Settings from './components/Settings'
import Nav from './components/Nav'
import Song from './components/Song'
import Player from './components/Player'

import { AppContext } from './contexts/AppContext'

import './styles/html.scss'
import './styles/app.scss'

function App() {
  const { isDarkMode } = useContext(AppContext)

  return (
    <div className={`app ${isDarkMode ? 'dark' : ''}`}>
      <Library />
      <Settings />

      <main>
        <Nav />
        <Song />
        <Player />
      </main>

      <footer>
        <span>Feito com</span>
        <Heart size={15} strokeWidth={2.5} />
        <span>por</span>
        <span>
          <a
            rel="noreferrer"
            target="_blank"
            href="https://github.com/TheusFacin"
          >
            <b>Theus</b>
          </a>
        </span>
      </footer>
    </div>
  )
}

export default App
