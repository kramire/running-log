# Running Log

Running Log is a tool that allows athletes to record daily runs, and receive alerts if he or she is potentially at risk for injury. Overtraining is a common problem amongst runners, and many times it's the result of increasing mileage too quickly. Luckily, there are easy guidelines to follow, and Running Log has this logic built in to the app. 

### Why is Running Log Different?

Many smart devices can track and summarize a single workout session. However, they don't quite capture performance overtime. Running Log creates an analytical dashboard from the user's daily mileage to show weekly trends, and alert users as to whether or not they are potentially overtraining. 

Furthermore, Running Log provides an outlet for remembering specifics about a run. Users have the option to indicate the type of run they went on, such as speed, distance, etc. There is also the option to select the location, and receive the day's corresponding weather information. There's even a notes section, where users can save anything else they'd like to remember.


## Getting Started

### Installation
Begin by forking this repository, and cloning to your computer. 

The project contains the folders `client` and `server`. Both require a `.env` file to be built. Please see the `.env.example` files in each folder to see a guideline on how these should be structured. Please note that the server requires two API keys one for Location IQ, and one for DarkSky.

Next, run `npm i` in both the `client` and `server` folders to install the necessary dependencies.

This application uses MongoDB as the database. Please ensure this is installed. 
For Mac users, you can use homebrew to install MongoDB by running `brew install mongodb`.


### To Start
Begin by starting MongoDB. For Mac users, this can be done by running `brew services start mongodb`.

To start the backend, navigate to the server folder and run `nodemon index.js`. If the server has successfully started, a console log will appear in the terminal stating "Listening on port...".

To start the frontend, navigate to the client folder and run `npm start`. This will build the React app, and open it in the browser.


## Tech Stack

React - frontend framework
Express - backend framework
MongoDb - database
LocationIQ API - for reverse geo-coding
DarkSky API - to gather historical weather information



