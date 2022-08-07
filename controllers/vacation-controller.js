const { response } = require("express");
const { request } = require("express");
const express = require("express");
const router = express.Router();
const vacationsLogic = require('../logic/vacation-logic');

router.get("/", async(request, response)=>{
    try{
        let vacations = (await vacationsLogic.getAllVacations());
        response.json(vacations);
    }
    catch(e){
        console.error(e);
        response.status(600).send(e.message);
    }
});

router.delete("/:id", async(request, response)=>{
    try{
        let id= request.params.id;
        console.log(id);
        await vacationsLogic.deleteVacation(id);
        response.json(id);
    }
    catch(e){
        console.error(e);
        response.status(600).send(e.message);
    }
})

router.post("/add", async (request, response) => {
    let vacation = request.body;
    console.log(vacation);
    try {
        vacation = await vacationsLogic.addVacation(vacation);
        let vacations = (await vacationsLogic.getAllVacations());
        response.json(vacations);
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message)
    }
});

router.post("/edit", async(request, response)=>{
    let vacation = request.body;
    try{
        vacation =  await vacationsLogic.editVacation(vacation);
        let vacations = (await vacationsLogic.getAllVacations());
        response.json(vacations);
    }
    catch(e){
        console.error(e);
        response.status(600).send(e.message);
    }
})

module.exports = router;