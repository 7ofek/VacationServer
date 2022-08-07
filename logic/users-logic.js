const usersDao = require('../dao/users-dao');
const crypto = require("crypto");
const config = require('../config/config.json');
const jwt = require('jsonwebtoken');
let likedVacationsDao = require("../dao/likedVacations-dao");
const jwt_decode = require('jwt-decode');

async function addUser(user) {
    validateUserData(user);
    if (await usersDao.isUserExistByEmail(user)) {
        throw new Error("email is already exist");
    }
    // normalizeOptionalData(user);
    user.password = encryptPassword(user.password);
    await usersDao.addUser(user);
}

function validateUserData(user){
    if (!user.password){
        throw new Error("password is missing");
    }    
    if (!user.name){
        throw new Error("username is missing");
    }
    if (!user.email){
        throw new Error("email is missing");
    }
}

function encryptPassword(password) {
    const saltRight = "sdkjfhdskajh";
    const saltLeft = "--mnlcfs;@!$ ";
    let passwordWithSalt = saltLeft + password + saltRight;
    return crypto.createHash("md5").update(passwordWithSalt).digest("hex");
}

async function login(userLoginData){
    userLoginData.password = encryptPassword(userLoginData.password);
    let userData = await usersDao.login(userLoginData);
    if (!userData){
        throw new Error("One of your details is incorrect, please try again");
    }
    const userLikedVacations= await likedVacationsDao.getUserLikedVacations(userData.id);
    const token = jwt.sign({ userType:userData.role, id: userData.id}, config.secret);
    let successfulLoginResponse = {token, email: userData.email, name: userData.name, userLikedVacations};
    return successfulLoginResponse;
}

async function loginWithToken(userLoginData){
    const decoded = decryptToken(userLoginData);
    const userLikedVacations= await likedVacationsDao.getUserLikedVacations(decoded.id);
    const response = await usersDao.loginWithToken(decoded.id);
    response.userLikedVacations = userLikedVacations;
    return response;
}



module.exports = {
    addUser,
    login,
    loginWithToken
}
function decryptToken(token){
    return jwt_decode(token);
}