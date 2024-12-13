const {handleHttpError} = require("../utils/handleError")

// Middleware para comprobar el rol del usuario
const checkRolUser = (roles) => (req,res,next) =>{
    try{
        const {user} = req
        const userRol = user.role[0]
        // Comprobamos si el rol del usuario está en el array de roles permitidos
        const checkRolValue = roles.includes(userRol)

        if(!checkRolValue){
            handleHttpError(res,"USER_NOT_ALLOWED",400)
            return
        }

        next()
    }catch(error){
        handleHttpError(res,"ERROR_CHECKING_ROLE",401)
    }
}

module.exports = checkRolUser