import displayController from './displayController.js'
import openWeather from './openWeather.js'

/*
 *
 * Private methods/variables
 *
 */

// Initialize variables that hold state data
let _weatherData
let _location
let _displayUnits = 'fahrenheit'
const _apiKeys = {
  openWeatherKey: process.env.OPEN_WEATHER_KEY || null,
  giphyKey: process.env.GIPHY_KEY || null
}

const _exampleLocations = [
  'Salt Lake City',
  'Denver',
  'Helsinki',
  'Tokyo'
]

function _getStateData () {
  let location

  // Transform weather data object depending on specified _displayUnits
  const weatherData = Object.assign({}, _weatherData)

  if (weatherData.temp === undefined || weatherData.temp === null) {
    weatherData.temp = null
  } else if (_displayUnits === 'fahrenheit') {
    weatherData.temp = _convertKelvinToFahrenheit(weatherData.temp)
  } else if (_displayUnits === 'celsius') {
    weatherData.temp = _convertKelvinToCelsius(weatherData.temp)
  }

  // Default to a random location if location is not provided
  if (_location === '' || _location === undefined) {
    location = _getRandomLocation()
  } else {
    location = _location
  }

  return {
    location,
    weatherData: weatherData,
    displayUnits: _displayUnits,
    apiKeys: _apiKeys
  }
}

function _convertKelvinToFahrenheit (tempK) {
  return Math.round((tempK * (9 / 5)) - 459.67)
}

function _convertKelvinToCelsius (tempK) {
  return Math.round(tempK - 273.15)
}

function _setWeatherData (weatherData) {
  _weatherData = weatherData

  // Render the new weather data
  displayController.renderWeather(_getStateData())
}

function _getRandomLocation () {
  return _exampleLocations[Math.floor(Math.random() * _exampleLocations.length)]
}

/*
 *
 * Public methods/variables
 *
 */

async function getWeatherData () {
  const weatherData = await openWeather.getWeatherData(_getStateData())
  _setWeatherData(weatherData)
}

function setLocation (newLocation) {
  _location = newLocation
}

function setDisplayUnits (displayUnits) {
  _displayUnits = displayUnits

  // Call render to display the new units
  displayController.renderWeather(_getStateData())
}

function setAPIKeys (openWeatherKey, giphyKey) {
  _apiKeys.openWeatherKey = openWeatherKey
  _apiKeys.giphyKey = giphyKey
}

function init () {
  displayController.init()
}

const app = {
  init,
  getWeatherData,
  setLocation,
  setDisplayUnits,
  setAPIKeys
}

export default app
