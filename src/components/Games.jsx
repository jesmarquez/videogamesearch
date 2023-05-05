function List({ items }) {
  return (
    <ul className='list'>
      {
        items.map(
          ({ name, id, cover, first_release_date }) => {
            return (<li className='list-item' key={id}>
              <img src={cover?.url} />
              <h3>{name}</h3>
              <small>{first_release_date}</small>
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
