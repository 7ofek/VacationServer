const vacationsDao = require('../dao/vacations-dao');

async function getAllVacations() {
    let vacations = await vacationsDao.getAllVacations();
    return vacations;
}

async function deleteVacation(id){
    await vacationsDao.deleteVacation(id);
    // pushLogic.broadcast("delete-vacation", id);
}

module.exports = {
    getAllVacations,
    deleteVacation
}