import giphy from './giphy.js'
import displayController from './displayController.js'

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
  if (!jsonResponse.ok) {
    const message = `Received an invalid response (status ${jsonResponse.status}) from the OpenWeather API. It is likely that a valid API key was not provided. See this project's README for further instructions.`
    displayController.alert(message)
    return
  }
  const weatherData = {}
  const response = await jsonResponse.json()

  // Extract relevant data from processed response object
  weatherData.temp = response.main.temp
  weatherData.weather = response.weather[0].main
  weatherData.description = response.weather[0].description

  // Query giphy for a relevant weather gif
  const imageUrl = await giphy.getWeatherGif(giphyKey, weatherData.weather)
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
