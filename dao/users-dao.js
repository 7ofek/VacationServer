let connection = require("./connection-wrapper");

async function addUser(user) {
    let sql = `INSERT INTO users (name, password, email, role) values(?, ?, ?, ?)`;
    let parameters = [user.name, user.password, user.email, user.role];
    let userData = await connection.executeWithParameters(sql, parameters);
    return userData.insertId;
}

async function isUserExistByEmail(user) {
    let sql = "SELECT email FROM vacations.users WHERE email=?";   
    let parameters = [user.email];
    let userEmails = await connection.executeWithParameters(sql, parameters);  
    if(userEmails && userEmails.length>0){
        return true;
    }
    return false;
}

async function login(user) {
    let sql = `SELECT email, role, id, name from users where email = ? and password = ?`;
    let parameters = [user.email, user.password];
    // console.log(user)
    let [userData] = await connection.executeWithParameters(sql, parameters);   
    console.log(userData);
    if (!userData){
        return null;
    }

    return userData;
}

async function loginWithToken(userLoginData){
    let sql = `SELECT email, role, id, name from users where id=?`;
    let parameters = [userLoginData];
    let [userData] = await connection.executeWithParameters(sql, parameters); 
    return userData;
}

module.exports={
    addUser,
    isUserExistByEmail,
    login,
    loginWithToken
}

