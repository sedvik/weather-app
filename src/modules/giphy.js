/*
 *
 * Private methods/variables
 *
 */

function _fetchGiphyData (giphyKey, searchKeyword) {
  const uriEncodedSearchKeyword = encodeURIComponent(searchKeyword)
  const jsonResponse = fetch(`https://api.giphy.com/v1/gifs/translate?api_key=${giphyKey}&s=${uriEncodedSearchKeyword}`, {
    mode: 'cors'
  })

  return jsonResponse
}

async function _processData (jsonResponse) {
  const response = await jsonResponse.json()
  return response.data.images.original.url
}

/*
 *
 * Public methods/variables
 *
 */

async function getWeatherGif (giphyKey, searchKeyword) {
  const jsonResponse = await _fetchGiphyData(giphyKey, searchKeyword)
  const response = await _processData(jsonResponse)
  return response
}

const giphy = {
  getWeatherGif
}

export default giphy
