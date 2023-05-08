import { convertUnixToDate } from "../helpers/convert-unix-to-date"
import { getGenresNames } from "../helpers/get-genres-name"
import { getImageUrlBySize } from "../helpers/get-image-url-by-size"
import { igdb_image_sizes } from "../types/igdb-image-sizes"

/**
 * 
 * @param {Object} param0  first_release_date is in Unix Timestamp
 * @returns {Object}
 */
export const gameMapper = ({id, name, cover, first_release_date, genres}) => {

  return {
    id,
    cover: getImageUrlBySize(cover, igdb_image_sizes.hd),
    name,
    year: convertUnixToDate(first_release_date),
    genres: getGenresNames(genres).join(', ')
  }
}