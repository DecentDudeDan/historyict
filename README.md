# Funapp

This is a super simple project for databases

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
If you have node and npm installed you can also simply type `npm start` which will build and serve the app.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.


## Node server

For the app to work you must run the backend in a seperate terminal. To run this server simply navigate to the app root directory and then run `node server.js`.
This server is configured to send a simple query every 10 seconds to keep the connection alive. 

## Configuring mySQL

In database.js there are 2 config setups, one that can be used to connect to the remote heroku database and one that I used to connect to my local one.
To change which database it connect to simply edit the line 
`this.connection = mysql.createConnection(this.localConfig);` 
to 
`this.connection = mysql.createConnection(this.config);`
