function List({ items }) {
  return (
    <ul className='list'>
      {
        items.map(
          ({ name, id, cover, year }) => {
            return (<li className='list-item' key={id}>
              <img src={cover ? cover : 'https://raw.githubusercontent.com/koehlersimon/fallback/master/Resources/Public/Images/placeholder.jpg'} />
              <h3>{name}</h3>
              <small>{year}</small>
            </li>)
          })
      }
    </ul>
  )
}

export function Games({ games }) {
  const hasGames = games?.length > 0
  return (
    hasGames
      ? <List items={games} />
      : <p className="text-center">No results</p >
  )
}
