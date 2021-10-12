/*
 *
 * Public methods/variables
 *
 */

async function getWeatherGif (giphyKey, searchKeyword) {
  const uriEncodedSearchKeyword = encodeURIComponent(searchKeyword)
  const weatherGif = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=${giphyKey}&s=${uriEncodedSearchKeyword}`, {
    mode: 'cors'
  })

  return weatherGif
}

const giphy = {
  getWeatherGif
}

export default giphy
