const express = require('express');
const cors = require('cors')
const server = express();
const vacationController = require('./controllers/vacation-controller');
const usersController = require('./controllers/users-controller');


server.use(cors({origin: "http://localhost:3000"}));
server.use(express.json());

server.use("/vacations", vacationController);
server.use("/users", usersController);

server.listen(3001, ()=> console.log("Listening on http://localhost:3001"));