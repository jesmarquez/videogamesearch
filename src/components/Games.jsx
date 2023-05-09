import { Loader, NoResults } from "./"


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

function WaitingInput() {
  return (
    <p className="text-center font-pixelated text-green animate-flicker">
      Waiting for you game search...
    </p>
  )
}

export function Games({ games, error, onLoading, query, firstTime }) {

  const hasGames = games?.length > 0


  if (error)
    return <p className="input-error-box">{error}</p>

  if (onLoading)
    return <Loader />

  if (firstTime)
    return <WaitingInput />

  return (
    hasGames
      ? <List items={games} />
      : <NoResults query={query} />
  )
}
