
import { useState, useEffect, useRef, useCallback } from 'react'
import { useGames } from './hooks'
import './App.css'
import { Games } from './components'
import debounce from 'just-debounce-it'

/*
  GAMES LIST

  Create a search videogames app.

  API: https://www.omdbapi.com/
  API_KEY: 4287ad07

  Requirements:
   - Show an input to look for a move and a search button *
   - List movies results and show their title, year and poster *
   - Movies should be shown on a responsive grid *

  Bonus requirements
  - Avoid make the same search twice *
  - Make search while writing on field *
  - Avoid search countinuosly while writing(debounce) *

*/

function App() {

  // const games = results
  const [query, updateQuery] = useState('')
  const [inputError, setInputError] = useState(null)
  const { getGames, games, isLoading } = useGames({ query })

  const firstTimeInput = useRef(true)
  const prevInput = useRef(query)

  const debouncedGetGames = useCallback(debounce((query) => getGames(query), 400), [])

  const handleChange = ({ target }) => {

    const newQuery = target.value
    if (newQuery.startsWith(" "))
      return
    debouncedGetGames(newQuery)
    updateQuery(newQuery)
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
