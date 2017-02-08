# HistoryICT

This is a project for History of Wichita intersections

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
If you have node and npm installed you can also simply type `npm start` which will build and serve the app.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.


## Node server

For the app to work you must run the backend in a seperate terminal. To run this server simply navigate to the app root directory and then run `node server.js` or `npm run backend`.
This server is configured to send a simple query every 10 seconds to keep the connection alive. 

## Configuring mySQL

Currently you will need to have a local instance of mysql running with the app for it to work. You can make your own local instance but you will also need to create all the tables that this app uses (with the same names, and configure the conect logic to connect to yours).
