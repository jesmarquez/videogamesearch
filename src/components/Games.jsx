import { Loader } from "./Loader"

function List({ items }) {
  return (
    <ul className='list'>
      {
        items.map(
          ({ name, id, cover, year, genres }) => {
            return (<li className='list-item' key={id}>
              <img src={cover ? cover : 'https://raw.githubusercontent.com/koehlersimon/fallback/master/Resources/Public/Images/placeholder.jpg'} />
              <h3>{name}</h3>
              <small>{genres}</small>
              <small className="text-muted small-text">{year}</small>
            </li>)
          })
      }
    </ul>
  )
}

export function Games({ games, error, onLoading }) {

  const hasGames = games?.length > 0

  if (error)
    return <p className="input-error-box">{error}</p>

  if (onLoading)
    return <Loader />

  return (
    hasGames
      ? <List items={games} />
      : <p className="text-center">No results :/</p >
  )
}
