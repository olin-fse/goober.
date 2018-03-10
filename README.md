# goober.
Goober. is an online events organization service for small local communities. Goober supports users like pick-up sports players, acquaintances, meetup group organizers to create, share, and join upcoming events.

## Setup & How to Run

1. Backend (NodeJS with Express)
  - install nodemon `sudo npm install -g nodemon`
  - run `npm start`

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
