import giphy from './giphy.js'

/*
 *
 * Private methods/variables
 *
 */

function _fetchWeatherData (openWeatherKey, location) {
  const uriEncodedLocation = encodeURIComponent(location)
  const jsonResponse = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${uriEncodedLocation}&appid=${openWeatherKey}`, {
    mode: 'cors'
  })

  return jsonResponse
}

async function _processData (jsonResponse, giphyKey) {
  const weatherData = {}
  const response = await jsonResponse.json()

  // Extract relevant data from processed response object
  weatherData.temp = response.main.temp
  weatherData.weather = response.weather.main
  weatherData.description = response.weather.description

  // Query giphy for a relevant weather gif
  const imageUrl = await giphy.getWeatherGif(giphyKey, weatherData.description)
  weatherData.imageUrl = imageUrl

  return weatherData
}

/*
 *
 * Public methods/variables
 *
 */

async function getWeatherData (appData) {
  const { location, apiKeys } = appData
  const { openWeatherKey, giphyKey } = apiKeys

  const jsonResponse = await _fetchWeatherData(openWeatherKey, location)
  const weatherData = await _processData(jsonResponse, giphyKey)

  return weatherData
}

const openWeather = {
  getWeatherData
}

export default openWeather
