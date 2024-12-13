const bcrypt = require("bcryptjs")

const encrypt = async (clearPassword) =>{
    const hash = await bcrypt.hash(clearPassword,10)
    return hash
}

const compare = async (clearPassword,hashedPassword) =>{
    const result = await bcrypt.compare(clearPassword,hashedPassword)
    return result
}

module.exports = {encrypt, compare}