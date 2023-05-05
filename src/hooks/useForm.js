import { useState, useEffect, useRef, useCallback } from 'react'
import debounce from 'just-debounce-it'

export const useForm = () => {

   const [query, updateQuery] = useState('')
   const [inputError, setInputError] = useState(null)

   const firstTimeInput = useRef(true)
   const prevInput = useRef(query)

   const debouncedGetGames = useCallback(debounce((query, callback) => callback(query), 400), [])


   const handleChange = (e, callback) => {

    const newQuery = e.target.value
    if (newQuery.startsWith(" "))
      return
    debouncedGetGames(newQuery, callback)
    updateQuery(newQuery)
  }
  //Validates input change values
  useEffect(() => {

    if (firstTimeInput.current) {
      firstTimeInput.current = query === ""
      return
    }

    if (query === "") {
      setInputError('Field must have something to look for')
      return
    }

    setInputError(null)
    
  }, [query]);

  const handleSubmit = (e, callback) => {
    e.preventDefault()
    if (prevInput.current === query)
      return
    prevInput.current = query
    callback(query)
  }

  return {
   query, 
   inputError,
   handleChange,
   handleSubmit 
  }
}
