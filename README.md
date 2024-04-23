# How to set up the project:
Install your preferred editor (e.g Visual Studio Code - VSC).
On the console, install:
* nvm (optionally, to install node)
* Clone the repository
* Run the command `npm install` in the project path (`your-path/Gamdom`)

# How to run tests:

* Run command `npm run play:api` to execute the api tests
* Run command `npm run play:ui:headed` to execute the UI tests with Chrome and Firefox headed browser
* Run command `npm run play:ui:headless` to execute the UI tests with Chrome and Firefox headless 
* Run command `npm run play:ui:debug` to open the UI mode

## More scripts can be found under the package.json file

To access the test report after running the tests, please run the command `npx playwright show-report`