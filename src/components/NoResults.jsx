import noResults from '../assets/no-results-1.gif'
export function NoResults({ query }) {
  return (
    <div className="no-results-wrapper position-relative">
      <div className="no-results-text text-center">
        <p className='mb-0'>No results where found for </p>
        <p className='mt-1'><i><u>{query}</u></i></p>
      </div>

      <img src={noResults} alt="No results gif image" />
    </div >
  )
}