const usersDao = require('../dao/users-dao');
const crypto = require("crypto");
const config = require('../config/config.json');
const jwt = require('jsonwebtoken');

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
// function normalizeOptionalData(userRegistrationData){
//     if (!userRegistrationData.name){
//         userRegistrationData.na = "";
//     }    

//     if (!userRegistrationData.lastName){
//         userRegistrationData.lastName = "";
//     }    
// }
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
        throw new Error("Login failed");
    }
    console.log(userData);
    const token = jwt.sign({ userType:userData.role, id: userData.id}, config.secret);
    let successfulLoginResponse = {token, email: userData.email, name: userData.name };
    console.log(successfulLoginResponse);
    return successfulLoginResponse;
}

module.exports = {
    addUser,
    login
}