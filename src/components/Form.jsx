export function Form({ query, error, onSubmit, onChange, callbackFn }) {
  return (
    <>
      <form onSubmit={(e) => onSubmit(e, callbackFn)}>
        <input type="text"
          style={{ border: `1px solid ${error ? 'red' : 'transparent'}`, }}
          onChange={(e) => onChange(e, callbackFn)}
          value={query} />
        <button type='submit'>SEARCH</button>
      </form><div className="input-error-box">
        {error
          ? <small>{error}</small>
          : null}
      </div>
    </>
  )
}