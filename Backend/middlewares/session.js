const {userModel,commerceModel} = require("../models")
const {handleHttpError} = require("../utils/handleError")
const {verifyToken} = require("../utils/handleJwt")

// Middleware para comprobar si el usuario está autenticado
const authUser = async (req,res,next) => {

    try{
        // Comprobamos si existe la cabecera de autorización
        if (!req.headers.authorization){
            handleHttpError(res,"NOT_AUTH_TOKEN",404)
            return
        }

        // Extraemos el token de la cabecera y lo verificamos
        const token = req.headers.authorization.split(' ').pop()

        const dataToken = await verifyToken(token)
        if(!dataToken._id){
            handleHttpError(res,"TOKEN_NOT_VERIFIED",403)
            return
        }

        // Buscamos el usuario en la base de datos y lo añadimos a la petición (para poder usarlo en los controladores y en otros middlewares)
        const user = await userModel.findById(dataToken._id)
        req.user = user
        next()
    }catch(error){
        handleHttpError(res,"ERROR_VERIFYING_TOKEN",403)
    }

}

module.exports = {authUser}