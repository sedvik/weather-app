import displayController from './displayController.js'
import openWeather from './openWeather.js'

/*
 *
 * Private methods/variables
 *
 */

// Initialize variables that hold state data
let _weatherData
const _location = 'Salt Lake City'
const _displayUnits = 'fahrenheit'
const _apiKeys = {
  openWeatherKey: process.env.OPEN_WEATHER_KEY || null,
  giphyKey: process.env.GIPHY_KEY || null
}

function _getStateData () {
  // transform weather data object depending on specified _displayUnits
  const weatherData = Object.assign({}, _weatherData)

  if (weatherData.temp === undefined || weatherData.temp === null) {
    weatherData.temp = null
  } else if (_displayUnits === 'fahrenheit') {
    weatherData.temp = _convertKelvinToFahrenheit(weatherData.temp)
  } else if (_displayUnits === 'celsius') {
    weatherData.temp = _convertKelvinToCelsius(weatherData.temp)
  }

  return {
    weatherData: _weatherData,
    location: _location,
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

  // Call render
}

/*
 *
 * Public methods/variables
 *
 */

async function getWeatherData () {
  const weatherData = await openWeather.getWeatherData(_getStateData())
  console.log(weatherData)
  _setWeatherData(weatherData)
}

function init () {
  const stateData = _getStateData()
  return stateData
}

const app = {
  init,
  getWeatherData
}

export default app
