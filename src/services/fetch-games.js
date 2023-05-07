const PROXY_URL = 'https://cors-anywhere.herokuapp.com/'
const BASE_URL = 'https://api.igdb.com/v4/games?search='

const query_params = 'fields=name, genres.*, first_release_date, involved_companies.*, rating, cover.*'

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

export const fetchGames = async (query) => {

  try{
    const res = await fetch(`${PROXY_URL + BASE_URL + query}&${query_params}`, fetchOpts)
    if(!res.ok){
      throw new Error('Error fetching IGDB API data')
    }
    const data = await res.json()
    const games = data?.map( ({id, name, cover, first_release_date}) => {
      return {
        id,
        cover: cover?.url,
        name,
        year: first_release_date
      }
    })
    return games
  }catch(e){
    return e
  }

}
