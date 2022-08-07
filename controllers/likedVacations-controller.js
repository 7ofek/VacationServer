const express= require("express");
const {response} = require ("express");
const {request}= require ("express");

const router= express. Router();
const likedVacationsLogic= require('../logic/likedVacations-logic');

router.get("/", async (request, response, next) => {
   
    let likedVacationsData = request.body;
    console.log(likedVacationsData);
    try {
        let likedVacations= await likedVacationsLogic.getLikesStat(likedVacationsData);
        response.json(likedVacations);
    }
    catch (error) {
        console.log(error);
        response.status(600).send(error.message);
    }
});
//add like
router.post("/", async (request, response, next) => {
   
    let addLikeData = request.body;
    console.log(addLikeData);
    try {
        let updateVacations= await likedVacationsLogic.likeVacation(addLikeData);
        response.json(updateVacations);
    }
    catch (error) {
        console.log(error);
        response.status(600).send(error.message);
        // return next(error);
    }
});

router.delete("/:id", async (request, response, next) => {
    let deletedVacationId = request.params.id;
    const token = request.headers.authorization;
    try {
        await likedVacationsLogic.unlikeVacation(deletedVacationId, token);
        response.json();
    }
    catch (error) {
        console.log(error);
        response.status(600).send(error.message);
    }
});

module.exports= router;