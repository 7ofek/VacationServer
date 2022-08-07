let likedVacationsDao = require("../dao/likedVacations-dao");
const jwt_decode = require('jwt-decode');

async function likeVacation(addLikeData) {
    let updateVacations= await likedVacationsDao.likeVacation(addLikeData);
    return updateVacations;
}
async function unlikeVacation(deletedVacationId, token) {
    const decode = decryptToken(token);
    await likedVacationsDao.unlikeVacation(deletedVacationId, decode.id);
}

async function getLikesStat(likedVacationsData){
   const likedVacations= await likedVacationsDao.getLikesStat(likedVacationsData);
   return likedVacations;
}


module.exports = {
    likeVacation,
    unlikeVacation,
    getLikesStat
}

function decryptToken(token){
    return jwt_decode(token);
}