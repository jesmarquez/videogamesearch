import { useState, useEffect, useCallback } from "react"
import { fetchGames } from "../services/fetch-games"

export const useGames = ({ query }) => {

  const [games, setGames] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const getGames = useCallback((query) => {
    if(query === '')
      return

      console.log('getting Movies...')
      setIsLoading(true)
      setError(null)

      fetchGames(query)
        .then( setGames )
        .catch( setError )
        .finally(()=> setIsLoading(false))

  }, [])

  useEffect(() => {
    console.log('running get Games')
  }, [getGames]);

  return {
    games,
    error,
    getGames,
    isLoading
  }
}
