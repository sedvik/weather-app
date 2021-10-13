# weather-app
The Odin Project - Weather App project implementation. The following techniques/technologies were practiced as part of this project:

1. Asynchrous Javascript using ES7 Async/Await syntax to interface with the OpenWeather and Giphy public APIs
2. Webpack Babel loader to transpile to an earlier ES version
3. ESLint usage while employing the JavaScript Standard Style Guide
4. Use of the dotenv-webpack plugin to prevent exposure of API keys

# Usage
Valid trial API keys for the OpenWeather API and the Giphy API must be provided for use of this application. The keys can be provided in 1 of 2 ways:

1. Click the "Add API Keys" button, paste in your API keys and click the "Add" button. This must be done each time the page is reloaded.
2. Clone this repository and create a .env file with API keys listed in the following format:

OPEN_WEATHER_KEY='YOUR OPENWEATHER KEY HERE'

GIPHY_KEY='YOUR GIPHY KEY HERE'

Once the API keys have been added, simply input a location and hit the "Search" button. The temperature, weather, and a gif to match the weather will be populated. Displayed temperature units can be toggled between fahrenheit and celsius at any time.

