let connection = require("./connection-wrapper");
const vacationsLogic = require('../logic/vacation-logic');

async function likeVacation(addLikeData) {
    let vacationId= addLikeData.vacationId;
    let userId= addLikeData.userId;
    let sql = "INSERT INTO likes (user_id, vacation_id)  values(?, ?)";
    let parameters = [userId,vacationId];
    await connection.executeWithParameters(sql, parameters);
    let updateVacations= await vacationsLogic.getAllVacations();
    return updateVacations;
}
async function unlikeVacation(deletedVacationId, userId) {
    let sql = `DELETE FROM likes WHERE user_id= ? and vacation_id = ?`;
    let parameters = [userId, deletedVacationId];
    await connection.executeWithParameters(sql, parameters);
}
async function getUserLikedVacations(userId) { 
    let sql = `SELECT vacation_id FROM likes where user_id=?`; 
    let parameters = [userId];
    let userLikedvacations = await connection.executeWithParameters(sql, parameters);    
    return userLikedvacations;
}

async function getLikesStat() { 
    let sql = `SELECT v.name, count(l.user_id) as amountOfFollowers FROM vacations.likes l inner join vacations.vacations v on v.id=l.vacation_id group by l.vacation_id`; 
    let likedvacations = await connection.execute(sql);
    console.log(likedvacations);    
    return likedvacations;
}


module.exports = {
    likeVacation,
    getUserLikedVacations,
    unlikeVacation,
    getLikesStat
};