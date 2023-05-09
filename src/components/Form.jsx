export function Form({ query, error, onSubmit, onChange, callbackFn }) {
  return (
    <>
      <form onSubmit={(e) => onSubmit(e, callbackFn)}>
        <input type="text"
          style={{ border: `1px solid ${error ? '#ab1111' : 'transparent'}`, }}
          onChange={(e) => onChange(e, callbackFn)}
          value={query} />
        <button type='submit' className='font-pixelated'>SEARCH</button>
      </form><div className="input-error-box">
        {error
          ? <small>{error}</small>
          : null}
      </div>
    </>
  )
}