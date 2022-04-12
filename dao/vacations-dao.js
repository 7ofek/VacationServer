let connection = require("./connection-wrapper");

async function getAllVacations() {
    let sql = "SELECT id, name, price,description, start_date as startDate, end_date as endDate, img_url as imgURL FROM vacations.vacations";   
    let vacations = await connection.execute(sql);    
    return vacations;
}

async function deleteVacation(id){
    let sql ="DELETE FROM vacations.vacations WHERE id=?;"
    let parameters = [id];
    await connection.executeWithParameters(sql, parameters);
}

module.exports={
    getAllVacations,
    deleteVacation
}
