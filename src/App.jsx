
import { useForm, useGames } from './hooks'
import './App.css'
import { Games, Form } from './components'

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
  - Make search automatically while writing on field *
  - Avoid search countinuosly while writing(debounce) *

*/

function App() {


  const { query, inputError, handleChange, handleSubmit } = useForm()
  const { getGames, games, isLoading } = useGames({ query })

  return (
    <div id="page">
      <header>
        <h1>VideoGames Search App</h1>
        <Form query={query}
          error={inputError}
          onSubmit={handleSubmit}
          onChange={handleChange}
          callbackFn={getGames} />
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
