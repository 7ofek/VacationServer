const { response } = require("express");
const { request } = require("express");
const express = require("express");
const router = express.Router();
const vacationsLogic = require('../logic/vacation-logic');

// Method: GET
// url: /vacations/
//getAllVacations()
// router.get("/", async(request, response)=>{
//     try{
//         let vacations = [
//             { id: 0, name: "Maldives", img: "maldives img.jpg",description:"njjkljel", price: 52000, startDate: "23/03/2022", endDate: "02/04/2022", active: false },
//             { id: 1, name: "Koh Phi Phi", img: "koh-phi-phi img.jpg",description:"njjkljel", price: 11000, startDate: "15/03/2022", endDate: "28/03/2022", active: false},
//             { id: 2, name: "Hawaii", img: "hawaii img.jpg",description:"njjkljel", price: 30000, startDate: "10/06/2022", endDate: "20/06/2022", active: false },
//             { id: 3, name: "Australia", img: "australia img.jpg",description:"njjkljel", price: 19500, startDate: "08/04/2022", endDate: "19/04/2022",active: false },
//             { id: 4, name: "Mexico", img: "mexico img.jpg",description:"njjkljel", price: 14200, startDate: "01/05/2022", endDate: "22/05/2022",active: false }
//         ];
//         response.json(vacations);
//     }
//     catch(e){
//         console.error(e);
//         response.status(600).send(e.message);
//     }
// });

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
        await vacationsLogic.deleteVacation(id);
        response.json(id);
    }
    catch(e){
        console.error(e);
        response.status(600).send(e.message);
    }
})

module.exports = router;