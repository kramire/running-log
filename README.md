# Running Log

Running Log is a tool that leverages data analytics to help runners avoid injury. Overtraining is a common problem amongst runners, and many times it's the result of increasing mileage too quickly. With Running Log, users can record the distance they've ran, and the app will calculate whether or not they are at risk of getting hurt.

### Why is Running Log Different?

Many smart devices can track and summarize a single workout session. However, they don't quite capture performance overtime. Running Log creates an analytical dashboard based on daily runs to show weekly trends, and alert users as to whether or not they are potentially overtraining. 

Furthermore, Running Log becomes a journal for remembering specifics about a run. When logging a new workout, users have the option to indicate the type of run they went on, (speed, distance, etc.) the location, and there's a notes section for anything additional. Running Log can even provide the historical weather information, which can be very beneficial when reviewing prior performance.


## Getting Started

### Installation
Begin by forking this repository, and cloning to your computer. 

The project contains the folders `client` and `server`. Both require a `.env` file to be built. Please see the `.env.example` files in each folder to see a guideline on how these should be structured. There are two optional API keys, one for Location IQ, and one for DarkSky. The first is for gathering the coordinates of the run location, and the second is querying the historical weather. The tool will still work without these keys, but some functionality will be lost.

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



