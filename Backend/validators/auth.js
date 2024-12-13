const {check} = require("express-validator")
const validateResults = require("../utils/handleValidator")

const validatorRegister = [
    check("name").exists().notEmpty().isLength({min:3,max:99}),
    check("lastName").exists().notEmpty().isLength({min:3,max:99}),
    check("email").exists().notEmpty().isEmail(),
    check("password").exists().notEmpty().isLength({min:8,max:16}),
    check("dateOfBirth").exists().notEmpty().isDate(),
    (req,res,next)=>{
        validateResults(req,res,next)
    }

]

const validateLogin = [
    check("email").exists().notEmpty().isEmail(),
    check("password").exists().notEmpty().isLength({ min: 8, max: 16 }),
    (req,res,next) =>{
        validateResults(req,res,next)
    }
]


module.exports = {validatorRegister,validateLogin}