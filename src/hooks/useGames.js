import { useState } from "react"

export const useGames = ({ query }) => {

  const [games, setGames] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  //const API_BASE_URL = 'https://api.igdb.com/v4/games?search=Outer Wilds&fields=name, genres.*, first_release_date, involved_companies.*, rating, cover.*'
  const PROXY_URL = 'https://cors-anywhere.herokuapp.com/'
  const getGames = () => {
    if(query === '')
      return
    const igdbHeaders = new Headers({
      "Client-ID": "vbcza6ewzcdmx1b6gdf0urk3z52gyr",
      "Authorization": "Bearer lkmfxobum33u4xlgxq4oq80c1me3q1",
      "Content-type" : "application/json",
    })

    const fetchOpts = {
      method: "post",
      headers: igdbHeaders,
      mode: "cors"
    }

    setIsLoading(true)
    console.log('getting Movies...')
    fetch(
      `${PROXY_URL}https://api.igdb.com/v4/games?search=${query}&fields=name, genres.*, first_release_date, involved_companies.*, rating, cover.*`, 
      fetchOpts)
      .then( res => {
        if(!res.ok){
          throw new Error('Error fetching IGDB API data')
        }
        return res.json()
      })
      .then( data => {
        setGames(data)
      })
      .finally(() => setIsLoading(false))

  }

  return {
    games,
    getGames,
    isLoading
  }
}
