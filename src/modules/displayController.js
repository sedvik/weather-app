import app from './app.js'
import weatherContent from '../views/weatherContent.js'
import loadingGif from '../images/loading.gif'

/*
 *
 * Private methods/variables
 *
 */

// Event Handlers
function _toggleAPIForm (e) {
  // Toggle button text
  if (e.target.textContent === 'Add API Keys') {
    e.target.textContent = 'Close Form'
  } else {
    e.target.textContent = 'Add API Keys'
  }

  // toggle display of api form
  const apiForm = document.querySelector('#api-form')
  if (apiForm.style.display === 'flex') {
    apiForm.style.display = 'none'
  } else {
    apiForm.style.display = 'flex'
  }
}

function _submitAPIKeys () {
  const openWeatherInput = document.querySelector('#openweather-api-key')
  const giphyInput = document.querySelector('#giphy-api-key')

  const openWeatherKey = openWeatherInput.value
  const giphyKey = giphyInput.value

  app.setAPIKeys(openWeatherKey, giphyKey)

  // Clear Input values
  openWeatherInput.value = ''
  giphyInput.value = ''
}

// Updates the location stored in app on input
function _handleLocationChange (e) {
  app.setLocation(e.target.value)
}

function _search () {
  _renderLoading()
  app.getWeatherData()
}

function _changeActiveUnit (e) {
  const clickedBtnId = e.target.id
  const otherBtnId = clickedBtnId === 'fahrenheit' ? 'celsius' : 'fahrenheit'
  const otherBtn = document.getElementById(otherBtnId)

  // toggle "selected" class of both unit buttons
  e.target.classList.toggle('selected')
  otherBtn.classList.toggle('selected')

  // Change application active Units
  app.setDisplayUnits(e.target.id)
}

function _assignEvents () {
  // Grab DOM elements
  const toggleAPIFormBtn = document.querySelector('#toggle-api-form')
  const addKeysBtn = document.querySelector('#add-keys-btn')
  const locationInput = document.querySelector('#location')
  const searchBtn = document.querySelector('#search-btn')
  const unitBtns = document.querySelectorAll('#unit-toggle button')

  // Assign events to each
  toggleAPIFormBtn.addEventListener('click', _toggleAPIForm)
  addKeysBtn.addEventListener('click', _submitAPIKeys)
  locationInput.addEventListener('input', _handleLocationChange)
  searchBtn.addEventListener('click', _search)
  unitBtns.forEach(btn => {
    btn.addEventListener('click', _changeActiveUnit)
  })
}

// _renderLoading shows a loading icon in the #content div
function _renderLoading () {
  const contentDiv = document.querySelector('#content')

  // Create img element
  const loadingGifImage = new Image()
  loadingGifImage.src = loadingGif
  loadingGifImage.alt = 'Loading Icon'
  loadingGifImage.classList.add('loading-gif')

  // Clear existing div content
  contentDiv.textContent = ''

  // Append gif to div
  contentDiv.appendChild(loadingGifImage)
}

/*
 *
 * Public methods/variables
 *
 */

// Initializes page event assignment
function init () {
  _assignEvents()
}

function renderWeather (data) {
  const {
    location,
    weatherData,
    displayUnits
  } = data

  const contentContainer = document.querySelector('#content-container')
  contentContainer.textContent = ''
  const content = weatherContent.render(location, weatherData, displayUnits)
  contentContainer.appendChild(content)
}

function alert (message) {
  window.alert(message)
}

const displayController = {
  init,
  renderWeather,
  alert
}

export default displayController
