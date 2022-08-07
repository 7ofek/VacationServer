const express = require('express');
const cors = require('cors')
const server = express();
const vacationController = require('./controllers/vacation-controller');
const usersController = require('./controllers/users-controller');
const likesController = require('./controllers/likedVacations-controller');
const loginFilter = require('./filters/login-filter');


server.use(cors({origin: "http://localhost:3000"}));
server.use(loginFilter());
server.use(express.json());

server.use("/vacations", vacationController);
server.use("/users", usersController);
server.use("/likedVacations", likesController);

server.listen(3001, ()=> console.log("Listening on http://localhost:3001"));