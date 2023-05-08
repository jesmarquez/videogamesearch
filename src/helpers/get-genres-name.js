/**
 * 
 * @param {Array} genres 
 * @returns {Array} array of names extracted from genre object
 */
export const getGenresNames = (genres) => {
  return genres ? genres.map( genre => genre.name ) : []
}
