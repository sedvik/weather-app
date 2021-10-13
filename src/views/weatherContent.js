import { domUtil } from './util.js'

/*
 *
 * Private methods/variables
 *
 */

function _createTemperatureDiv (weatherData, displayUnits) {
  const temperature = weatherData.temp
  const unit = displayUnits === 'fahrenheit' ? 'F' : 'C'
  const temperatureHTMLContent = `${temperature}&deg;${unit}`

  // Parent
  const temperatureDiv = domUtil.create('div', '', {
    class: 'temperature'
  })

  // Children
  const temperatureLabelH3 = domUtil.create('h3', 'Temperature')
  const temperatureP = document.createElement('p')
  temperatureP.innerHTML = temperatureHTMLContent
  const children = [temperatureLabelH3, temperatureP]

  // Append children to parent
  domUtil.appendChildren(temperatureDiv, children)

  return temperatureDiv
}

function _createWeatherDiv (weatherData) {
  const { weather } = weatherData

  // Parent
  const weatherDiv = domUtil.create('div', '', {
    class: 'weather'
  })

  // Children
  const weatherLabelH3 = domUtil.create('h3', 'Weather')
  const weatherP = domUtil.create('p', weather)
  const children = [weatherLabelH3, weatherP]

  // Append children to parent
  domUtil.appendChildren(weatherDiv, children)

  return weatherDiv
}

function _createDescriptionDiv (weatherData) {
  const { description } = weatherData

  // Parent
  const descriptionDiv = domUtil.create('div', '', {
    class: 'description'
  })

  // Children
  const descriptionLabelH3 = domUtil.create('h3', 'Description')
  const descriptionP = domUtil.create('p', description)
  const children = [descriptionLabelH3, descriptionP]

  // Append children to parent
  domUtil.appendChildren(descriptionDiv, children)

  return descriptionDiv
}

function _createGifContainerDiv (weatherData) {
  const gifUrl = weatherData.imageUrl

  // Parent
  const gifContainerDiv = domUtil.create('div', '', {
    class: 'gif-container'
  })

  // Child
  const weatherGif = new Image()
  weatherGif.src = gifUrl
  weatherGif.alt = 'Gif of the weather'

  // Append child to parent
  gifContainerDiv.appendChild(weatherGif)

  return gifContainerDiv
}

/*
 *
 * Public methods/variables
 *
 */

function render (location, weatherData, displayUnits) {
  // Parent
  const contentDiv = domUtil.create('div', '', {
    id: 'content'
  })

  // Children
  const locationH2 = domUtil.create('h2', location)
  const temperatureDiv = _createTemperatureDiv(weatherData, displayUnits)
  const weatherDiv = _createWeatherDiv(weatherData)
  const descriptionDiv = _createDescriptionDiv(weatherData)
  const gifContainerDiv = _createGifContainerDiv(weatherData)
  const children = [
    locationH2,
    temperatureDiv,
    weatherDiv,
    descriptionDiv,
    gifContainerDiv
  ]

  // Append children to parent
  domUtil.appendChildren(contentDiv, children)

  return contentDiv
}

const weatherContent = { render }

export default weatherContent
