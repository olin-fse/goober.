# goober.
Goober. is an online events organization service for small local communities. Goober supports users like pick-up sports players, acquaintances, meetup group organizers to create, share, and join upcoming events.

## Setup & How to Run

1. Backend (NodeJS with Express, Facebook Passport for Auth)
  - Install node > 8.10.0.
  - (Recommended) Use nvm to install node, this installs the LTS version.
    ```bash
    $ sudo apt-get update
    $ sudo apt-get install build-essential libssl-dev
    $ curl -sL https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh -o install_nvm.sh
    $ bash install_nvm.sh
    $ source ~/.profile
    $ nvm install --lts
    ```
  - install nodemon `sudo npm install -g nodemon`
  - Create a .env file in your root directory:
      ```bash
      $ nvm use --lts
      $ export NODE_ENV=test
      $ export FACEBOOK_APP_ID='getyourown'
      $ export FACEBOOK_APP_SECRET='getyourown'
      ```
  - `source .env`
  - run `npm start`
  - `npm run server` runs the server headlessly (used for e2e tests)

2. Frontend (React, React-Router, Webpack)
  - `npm install` to install node_modules listed in package.json
  - `cd frontend`
  - (dev) run `$ npm run watch`
  - (prod) run `$ npm run build`
  - Run `npm install --save` to add new node_modules

3. Database (MongoDB with Mongoose)
 - `sudo service mongod start`

## Testing
Jest is the test framework for backend (unit tests, integration tests)
WebdriverIO is used for frontend (end-to-end tests)

1. Backend (Jest)
  - `npm run test`
  - Environment Variable NODE_ENV is set to 'test' (NODE_ENV=test)

2. Frontend (WebdriverIO, Chai)
  - `cd frontend`
  - `npm run e2e`
  - Travis runs e2e tests with headless chrome, with two matrices in travis.yml
