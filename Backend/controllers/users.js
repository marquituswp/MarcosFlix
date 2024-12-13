// Controladores de usuarios
const {userModel,movieModel} = require("../models")
const {handleHttpError} = require("../utils/handleError")
const {encrypt} = require("../utils/handlePassword")
const {matchedData} = require("express-validator")

// Función para obtener todos los usuarios
const getUsers = async (req,res)=>{
    try{
        data = await userModel.find({})
        res.status(200).json(data)
    }catch(error){
        handleHttpError(res,"ERROR_GET_USERS",403)
    }
}

// Función para modificar un usuario
const modifyUsers = async (req,res) =>{
    try{
        const {...body} = matchedData(req)
        // Obtengo el id del usuario logueado desde el token
        const id = req.user._id
        // Compruebo que el usuario exista
        const user = await userModel.findById({_id:id})
        if(!user){
            handleHttpError(res,"USER_NOT_FOUND",403)
            return
        }
        // Compruebo si se ha modificado la contraseña, en caso afirmativo la encripto
        if(body.password){
            const hashedPassword = await encrypt(body.password)
            body.password = hashedPassword
        }
        // Actualizo el usuario
        const data = await userModel.findByIdAndUpdate(id,body,{new:true})

        res.status(200).json({message:"User updated",
            data:data
        })
    }catch(error){
        handleHttpError(res,"ERROR_UPDATING_USER",403)
    }
}

// Función para eliminar un usuario
const deleteUser = async (req,res) =>{
    try{
        const {id} = matchedData(req)
        // Compruebo que el usuario exista
        const user = await userModel.findById({_id:id})
        if(!user){
            handleHttpError(res,"USER_NOT_FOUND",403)
            return
        }
        // Compruebo que el usuario que intenta borrar sea el mismo que el logueado (solo se puede borrar a uno mismo)
        if (user.email !== req.user.email){
            handleHttpError(res,"CAN'T_DELETE_OTHERS",403)
            return
        }
        // Borro el usuario
        await userModel.findOneAndDelete({_id:id})
        res.status(200).json({message:"User deleted succesfully"})
    }catch(error){
        handleHttpError(res,"ERROR_DELETING_USER",403)
    }
}

// Función para modificar el rol de un usuario
const modifyUserRole = async (req,res)=>{
    try{
        const {email,role} =matchedData(req)
        // Compruebo que el usuario exista
        const user = await userModel.findOneAndUpdate({email}, {role}, {new:true})
        if(!user){
            handleHttpError(res,"USER_NOT_FOUND",403)
            return
        }
        res.status(200).json({message:"Role changed"})
    }catch(error){
        handleHttpError(res,"ERROR_UPDATING_ROLE",403)
    }
}

// Función para añadir una review a una web
const reviewMovie = async (req,res) => {
    try{
        const {MovieId,scoring,review} = matchedData(req)
        const movie = await movieModel.findById({_id:MovieId})
        // Compruebo que la movie existe
        if(!movie){
            handleHttpError(res,"MOVIE_NOT_FOUND",403)
        }
        // Añado la review a la movie
        const reviews_data = movie.reviews
        // Creo un objeto con la review y lo añado al array de reviews
        const data = {
            scoring:scoring,
            review:review
        }
        reviews_data.push(data)
        const moviePoints = reviews_data.map(review => review.scoring).reduce((a,b)=>a+b,0)/reviews_data.length
        const movieReviewed = await movieModel.findByIdAndUpdate({_id:MovieId},{reviews:reviews_data,points:moviePoints},{new:true})
        res.status(200).json({message: "Movie Reviewed" , movie: movieReviewed})

    }catch(error){
        handleHttpError(res,"ERROR_REVIEWING_MOVIE",403)
    }
}

module.exports = {getUsers,modifyUsers,deleteUser,modifyUserRole,reviewMovie}