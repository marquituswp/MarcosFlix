const jwt = require("jsonwebtoken")
const {handleHttpError} = require("../utils/handleError")
const JWT_SECRET = process.env.JWT_SECRET

const tokenSign = async (user) =>{
    const sign = jwt.sign(
        {
            _id:user._id,
            role:user.role
        },
        JWT_SECRET,
        {
            expiresIn:"24h"
        }
    )
    return sign
}

const verifyToken = async (token)=>{
    try{
        return jwt.verify(token,JWT_SECRET)
    }catch(error){
        handleHttpError(res,"ERROR_VERIFY_TOKEN",403)
    }

}

module.exports = {tokenSign,verifyToken}