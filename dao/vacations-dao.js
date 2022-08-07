let connection = require("./connection-wrapper");
let validateDate = require("validate-date");

async function getAllVacations() {
    let sql = "SELECT v.id, v.name, v.price,v.description, v.start_date as startDate, v.end_date as endDate, v.img_url as imgURL, count(l.user_id) as amountOfLikes FROM vacations v left join likes l on v.id= l.vacation_id group by v.id";   
    let vacations = await connection.execute(sql);    
    return vacations;
}

async function deleteVacation(id){
    let sql ="DELETE FROM vacations.vacations WHERE id=?;"
    let parameters = [id];
    console.log(id);
    let vacationData = await connection.executeWithParameters(sql, parameters);  
    console.log(vacationData);
    return vacationData;
}

async function editVacation(vacation){
    let sql = "update vacations set name = ?, price = ?, description = ?, img_url = ?, start_date = ?, end_date = ? where id = ?";
    let parameters = [vacation.name, vacation.price,vacation.description, vacation.imgURL, vacation.startDate, vacation.endDate, vacation.id];
    let vacationData = await connection.executeWithParameters(sql, parameters); 
    return vacationData.inserId; 
}

async function addVacation(vacation) {
    let sql = "INSERT INTO vacations (name, price, img_url, description, start_date, end_date )  values(?, ?, ?, ?, ? ,?)";
    let parameters = [vacation.name, vacation.price, vacation.imgURL, vacation.description, vacation.startDate, vacation.endDate];
    let vacationData = await connection.executeWithParameters(sql, parameters);
    return vacationData.insertId;
}

async function isVacationExistByName(vacation) {
    let sql = "SELECT name FROM vacations.vacations WHERE name=?";   
    let parameters = [vacation.name];
    let vacationNames = await connection.executeWithParameters(sql, parameters);  
    if(vacationNames && vacationNames.length>0){
        return true;
    }
    return false;
}

async function deleteVacationFromLikedVacations(id){
    let sql = "delete from likes where vacation_id=?";
    let parameters = [id];
    await connection.executeWithParameters(sql, parameters);
}

module.exports={
    getAllVacations,
    deleteVacation,
    editVacation,
    isVacationExistByName,
    addVacation,
    deleteVacationFromLikedVacations
}
