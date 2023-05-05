
import { useState, useEffect, useRef } from 'react'
import { useGames } from './hooks'
import './App.css'
import results from './mocks/results.json'

import { Games } from './components'

/*
  GAMES LIST

  Create a search videogames app.

  API: https://www.omdbapi.com/
  API_KEY: 4287ad07

  Requirements:
   - Show an input to look for a move and a search button
   - List movies results and show their title, year and poster *
   - Movies should be shown on a responsive grid *

*/

function App() {

  // const games = results
  const [query, updateQuery] = useState('')
  const [inputError, setInputError] = useState(null)
  const { getGames, games, isLoading } = useGames({ query })

  const firstTimeInput = useRef(true)
  const prevInput = useRef(query)

  const handleChange = ({ target }) => {
    if (target.value.startsWith(" "))
      return
    updateQuery(target.value)
  }
  //Validates input change values
  useEffect(() => {

    if (firstTimeInput.current) {
      firstTimeInput.current = query === ""
      return
    }

    if (query === "") {
      setInputError('Field must have something to look for')
      return
    }
    setInputError(null)
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault()
    if (prevInput.current === query)
      return
    prevInput.current = query
    getGames(query)
  }

  return (
    <div id="page">
      <header>
        <h1>VideoGames Search App</h1>
        <form onSubmit={handleSubmit}>
          <input type="text"
            style={{ border: `1px solid ${inputError ? 'red' : 'transparent'}`, }}
            onChange={handleChange}
            value={query} />
          <button type='submit'>SEARCH</button>
        </form>
        <div className="input-error-box">
          {
            inputError
              ? <small>{inputError}</small>
              : null
          }
        </div>
      </header>
      <main>
        {
          !isLoading
            ? <Games games={games} />
            : <p className='text-center'>Loading...</p>
        }
      </main>
    </div>
  )
}

export default App
