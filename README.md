# goober.
Goober. is an online events organization service for small local communities. Goober supports users like pick-up sports players, acquaintances, meetup group organizers to create, share, and join upcoming events.

## Setup & How to Run

Basic setup guide for Django and React: [here](http://v1k45.com/blog/modern-django-part-1-setting-up-django-and-react/)

1. Backend(Django)
  - setup python virtual envrionment using virtualenv, make sure it's python3
    - `sudo apt-get install python3-pip`
    - `sudo pip3 install virtualen`
  - `$ source ~/venv/bin/activate`
  - freeze distribution by `$pip freeze > requirements.txt ` when pushing new code
  - Install packages receursively by running `$pip install -r requirements.txt` when pulling new code
  - (dev) `(venv) $./manage.py runserver`, go to localhost:8000, will give you an error message because the app is being served using webpack on localhost:3000.
  - (production) `$(venv) python manage.py runserver --settings=goober.production_settings`

2. Frontend (ReactJS on webpack)
  - `cd frontend`
  - (dev) run `$ npm run start`, then go to localhost:3000
  - (prod) run `$ npm run build`, for production, the frontend is not served by webpack but by django-webpack-loader

3. Database (MongoDB with Django MongoDB engine)
  - [documentation](http://django-mongodb-engine.readthedocs.io/en/latest/tutorial.html)
