const mongoose = require("mongoose")
const {handleHttpError} = require("../utils/handleError")
const dbConnect=()=>{
    const db_uri = process.env.DB_URI
    mongoose.set("strictQuery",false)
    try{
        mongoose.connect(db_uri)
    }catch (error){
        handleHttpError(res,"ERROR_CONNECTING_DB",403)
    }

    mongoose.connection.on("connected",()=> console.log("Conectado a la BBDD"))
}

module.exports=dbConnect