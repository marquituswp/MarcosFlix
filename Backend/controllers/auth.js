const {userModel} = require("../models/index")
const {matchedData} = require("express-validator")
const {encrypt, compare} = require("../utils/handlePassword")
const {tokenSign} = require("../utils/handleJwt")
const { uploadToPinata } = require("../utils/handleUploadIPFS")
const {handleHttpError} = require("../utils/handleError")

const registerUser = async (req,res) =>{
    try{
        req = matchedData(req)   
        const password = await encrypt(req.password)
        const body = {...req, password}
        const dataUser = await userModel.create(body)
        dataUser.set('password',undefined,{strict:false})

        const data = {
            token: await tokenSign(dataUser),
            user: dataUser
        }
        res.status(200).send(data)
    }catch (error){
        handleHttpError(res,"ERROR_REGISTER_USER",403)
    }
}

const loginUser = async(req,res)=>{
    try{
        req = matchedData(req)
        const user = await userModel.findOne({email:req.email})

        if(!user){
            handleHttpError(res,"USER_NOT_FOUND",400)
            return
        }

        const hashedPassword = user.password
        const checkPassword = await compare(req.password,hashedPassword)

        if(!checkPassword){
            handleHttpError(res,"INVALID_PASSWORD",401)
            retun
        }
        user.set('password',undefined,{strict:false})
        const data = {
            token: await tokenSign(user),
            user: user
        }
        res.status(200).send(data)

    }catch{
        handleHttpError(res,"ERROR_LOGIN",403)
    }
}

const uploadProfilePicture = async (req, res) => {
    try {
        const id = req.user._id
        if (!userModel.findById(id)) {
            handleHttpError(res, "USER_NOT_FOUND", 400)
            return
        }
        const fileBuffer = req.file.buffer
        const fileName = req.file.originalname
        const pinataResponse = await uploadToPinata(fileBuffer, fileName)
        const ipfsFile = pinataResponse.IpfsHash
        const ipfs = `https://${process.env.PINATA_GATEWAY_URL}/ipfs/${ipfsFile}`
        const user = await userModel.findOneAndUpdate({ _id: id }, { profilePicture: ipfs }, { new: true })
        res.status(200).json({ message: "IMAGE_UPLOADED", user: user })
    } catch (err) {
        console.log(err)
        handleHttpError(res, "ERROR_UPLOAD_IMAGE")
    }
}

module.exports = {registerUser, loginUser,uploadProfilePicture}