# Database Folder
As much as possible, only the database team will modify everything in this folder. If there are other teams that will modify files in this folder, consult first with TL on how to do so. Both parties must be active

# Installation
Don't forget to run `npm install` and `npm audit fix` to install the `node_modules` folder. You must run it on the database folder; running these commands on the root C5L-GWA-Verifier folder will not actually let you run the database codes.

### Launching the database
Run `node index.js`.

It will log a `"Server started at port 3001"` message. You may also run `mongo.exe` and find the `KALATAS` database.

### Test
For testing, you may choose to do `npm install request` and modify the `request.js` file you will run using `node ./request.js`. This file will contain the url request that you will send in order to test the mongodb server.


# Current Progress
Implemented Collections:
* Users
* Students
* Courses
* Degrees
* Histories
* Notes