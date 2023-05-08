//import results from '../mocks/results.json'
import { gameMapper } from "../mappers/game.mapper"

const PROXY_URL = !import.meta.env.PROD ? 'https://cors-anywhere.herokuapp.com/' : ''
const BASE_URL = 'https://api.igdb.com/v4/games?search='

const IGDBHeaders = new Headers({
  "Client-ID": import.meta.env.VITE_IGDB_CLIENT_ID,
  "Authorization": import.meta.env.VITE_IGDB_AUTH_TOKEN,
  "Content-type" : "application/json",
})

const fetchOpts = {
  method: "POST",
  headers: IGDBHeaders,
  mode: "cors"
}

const query_params = 'fields=name, genres.*, first_release_date, involved_companies.*, rating, cover.*'

export const fetchGames = async (query) => {
 
  // console.log(import.meta.env.PROD)
  // return results.map(gameMapper)
  
  try{
    const res = await fetch(
      `${PROXY_URL + BASE_URL + query}&${query_params}`,
       fetchOpts)
       
    if(!res.ok){
      throw new Error('Error fetching IGDB API data')
    }
    const data = await res.json()
    //console.log(data)
    const games = data?.map(gameMapper)
    //console.log(games)
    return games
  }catch(e){
    return e
  }
}
