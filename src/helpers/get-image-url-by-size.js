/* 
  Replaces default  url image size query 
  more info about how it works:
  https://api-docs.igdb.com/#images
*/

import defaultIMG from '../assets/default-img.png'

export const getImageUrlBySize = (cover, size) => {
  return cover?.url 
    ? cover.url.replace('t_thumb', size)
    : defaultIMG

}
