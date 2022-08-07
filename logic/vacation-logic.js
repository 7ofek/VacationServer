const vacationsDao = require('../dao/vacations-dao');
const config = require('../config/config.json');
const jwt = require('jsonwebtoken');
let validateDate = require("validate-date");

async function getAllVacations() {
    let vacations = await vacationsDao.getAllVacations();
    return vacations;
}

async function deleteVacation(id){
    vacationsDao.deleteVacationFromLikedVacations(id);
    await vacationsDao.deleteVacation(id);
}

async function editVacation(vacation){
    await vacationsDao.editVacation(vacation);
    console.log(vacation);
    return vacation;
}

async function addVacation(vacation){
    if (await vacationsDao.isVacationExistByName(vacation)) {
        return null;
    }
    validVacation(vacation);
    await vacationsDao.addVacation(vacation);
    console.log(vacation);
    return vacation;
}

function validVacation(vacation){
    if(vacation.name.length < 2){
        throw new Error("Vacation name too short")
    }
    if(vacation.price <= 0){
        throw new Error("Vacation price must be larger than 0")
    }
    if(vacation.description.length < 2){
        throw new Error("Vacation description too short")
    }
    if(!validateDate(vacation.startDate, responseType="boolean")){
        throw new Error("Vacation start date is not valid, try again")
    }
    if(!validateDate(vacation.endDate, responseType="boolean")){
        throw new Error("Vacation end date is not valid, try again")
    }
}

module.exports = {
    getAllVacations,
    deleteVacation,
    editVacation,
    addVacation
}