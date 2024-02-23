
## Available Scripts

In the project directory, you can run:

### `npm start` or `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test` or `yarn start`

Launches the test runner in the interactive watch mode.\

## Docker

### `docker image build -t react-example-image:latest .`

This will build image
### `docker run -dp 8000:3000 --name react-example-container react-example-image:latest`

This will run doscker and app will be available on [http://localhost:8000]