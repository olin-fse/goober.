# goober.
Goober. is an online events organization service for small local communities. Goober supports users like pick-up sports players, acquaintances, meetup group organizers to create, share, and join upcoming events.

## Setup & How to Run

1. Backend (NodeJS)
  - `npm run start`

2. Frontend (React & Webpack)
  - `npm install` to install node_modules listed in package.json
  - `cd frontend`
  - (dev) run `$ npm run watch`
  - (prod) run `$ npm run build`
  - Run `npm install --save` to add new node_modules

3. Database (MongoDB with Mongoose)
 - `sudo service mongod start`

## Testing
Jest is the test framework for both backend and frontend.
1. Backend
  - `npm run test`
  - Environment Variable NODE_ENV is set to 'test' (NODE_ENV=test)
2. Frontend
  - `cd frontend`
  - `npm run test`
