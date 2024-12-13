const { movieModel } = require("../models")
const { matchedData } = require("express-validator")
const { handleHttpError } = require("../utils/handleError")
const { uploadToPinata } = require("../utils/handleUploadIPFS")
const stringSimilarity = require("string-similarity")

const getMovies = async (req, res) => {
    try {
        const { title, date, actor, genre, order, minScoring, platforms } = matchedData(req)
        let filters = {}
        if (title) {
            filters.title = { $regex: new RegExp(title, "i") }
        }

        if (date) {
            filters.date = { $gte: new Date(date) }
        }

        if (actor) {
            filters.actors = { $regex: new RegExp(actor, "i") }
        }

        if (genre) {
            filters.filmGenre = { $in: [genre] }
        }

        if (minScoring) {
            filters["points"] = { $gte: parseFloat(minScoring) }
        }

        if (platforms) {
            filters.platforms = { $in: platforms };
        }

        let sortOption = {};
        if (order === "true") {
            sortOption["points"] = -1;
        }

        const movies = await movieModel.find(filters).sort(sortOption)

        if (movies.length === 0) {
            handleHttpError(res, "NO_MOVIES_DATA", 400)
            return
        }

        res.status(200).send(movies)
    } catch {
        handleHttpError(res, "ERROR_GET_MOVIES", 403)
    }
}

const getMovie = async (req, res) => {
    try {
        const { id } = matchedData(req)
        const movie = await movieModel
            .findById({ _id: id })
        if (!movie) {
            handleHttpError(res, "MOVIE_NOT_FOUND", 400)
            return
        }
        res.status(200).send(movie)
    } catch {
        handleHttpError(res, "ERROR_GET_MOVIE", 403)
    }
}

const getFavorites = async (req, res) => {
    try {
        const { title, date, actor, genre, order, minScoring, platforms } = matchedData(req)
        let filters = {}
        if (title) {
            filters.title = { $regex: new RegExp(title, "i") }
        }

        if (date) {
            filters.date = { $gte: new Date(date) }
        }

        if (actor) {
            filters.actors = { $regex: new RegExp(actor, "i") }
        }

        if (genre) {
            filters.filmGenre = { $in: [genre] }
        }

        if (minScoring) {
            filters["points"] = { $gte: parseFloat(minScoring) }
        }

        if (platforms) {
            filters.platforms = { $in: platforms };
        }

        let sortOption = {};
        if (order === "true") {
            sortOption["points"] = -1;
        }
        filters.isFavorite = true
        const movies = await movieModel.find(filters).sort(sortOption)

        if (movies.length === 0) {
            handleHttpError(res, "NO_FAVORITES", 400)
            return
        }
        res.status(200).send(movies)
    } catch {
        handleHttpError(res, "ERROR_GET_FAVORITES", 403)
    }
}

const setFavorite = async (req, res) => {
    try {
        const { id, isFavorite } = matchedData(req)
        const movie = await movieModel
            .findByIdAndUpdate({ _id: id }, { isFavorite: isFavorite }, { new: true })
        if (!movie) {
            handleHttpError(res, "MOVIE_NOT_FOUND", 400)
            return
        }
        res.status(200).send(movie)
    } catch {
        handleHttpError(res, "ERROR_SET_FAVORITE", 403)
    }
}

const createMovie = async (req, res) => {
    try {
        const movie = matchedData(req)
        const existingTitles = (await movieModel.find()).map(movie => movie.title)
        const existingDates = (await movieModel.find()).map(movie => movie.date)
        if (existingTitles.length > 0) {
            const similarity = stringSimilarity.findBestMatch(movie.title, existingTitles);
            if (similarity.bestMatch.rating > 0.8 && movie.date.getTime() === existingDates[similarity.bestMatchIndex].getTime()) {
                handleHttpError(res, "MOVIE ALREADY EXISTS", 400)
                return
            }
        }
        const movieCreated = await movieModel.create(movie)


        res.status(200).send(movieCreated)
    } catch {
        handleHttpError(res, "ERROR_CREATE_MOVIE", 403)
    }
}

const deleteMovie = async (req, res) => {

    try {
        const { id } = matchedData(req)
        //Extraemos el tipo de eliminación
        const { hard } = req.query
        const hardLowerCase = hard.toLowerCase()
        const data = await movieModel.findById({ _id: id })
        //Si no existe la movie, lanzamos un error
        if (!data) {
            handleHttpError(res, "MOVIE_NOT_FOUND", 403)
            return
        }

        if (hardLowerCase === "true") {
            // Elimino la movie de forma física
            await movieModel.findOneAndDelete({ _id: id });
            res.status(200).json({ message: "MOVIE_DELETED_PHISICALY" })
        }
        else if (hardLowerCase === "false") {
            // Elimino la movie de forma lógica
            await movieModel.delete({ _id: id });
            res.status(200).json({ message: "MOVIE_DELETED_LOGICALY" });
        } else if (!hardLowerCase) {
            //Si no se especifica el tipo de eliminación, lanzamos un error
            handleHttpError(res, "NO_HARD_VALUE", 403)
            return
        } else {
            //Si el tipo de eliminación no es válido, lanzamos un error
            handleHttpError(res, "INVALID_HARD_VALUE", 403)
            return
        }
    } catch (error) {
        handleHttpError(res, "ERROR_DELETE_MOVIE", 403)
    }

}

// Función para restaurar una movie
const restoreMovie = async (req, res) => {
    try {
        const { id } = matchedData(req)
        // Comprobamos si la movie ha sido eliminada
        const data = await movieModel.findById({ _id: id })
        if (!data) {
            // Si ha sido eliminada, la restauramos
            const movieRestored = await movieModel.restore({ _id: id })
            const movie = await movieModel.findById({ _id: id })
            // Comprobamos si la movie ha sido restaurada
            if (movieRestored.modifiedCount === 1) {
                // Si coincide, devolvemos la movie restaurada
                res.status(200).json({ message: "MOVIE_RESTORED", movie: movie })
                return
            }
            handleHttpError(res, "MOVIE_NOT_EXISTENT", 403)
            return
        }
        handleHttpError(res, "MOVIE_NOT_DELETED", 403)
        return

    } catch (error) {
        handleHttpError(res, "ERROR_RESTORE_MOVIE", 403)
    }
}

const updateImage = async (req, res) => {
    try {
        const { id } = matchedData(req)
        if (!movieModel.findById(id)) {
            handleHttpError(res, "MOVIE_NOT_FOUND", 400)
            return
        }
        if (req.body.image){
            const movie = await movieModel.findOneAndUpdate({ _id: id }, { poster: req.body.image }, { new: true })
            res.status(200).json({ message: "IMAGE_UPLOADED", movie: movie })
            return
        }
        const fileBuffer = req.file.buffer
        const fileName = req.file.originalname
        const pinataResponse = await uploadToPinata(fileBuffer, fileName)
        const ipfsFile = pinataResponse.IpfsHash
        const ipfs = `https://${process.env.PINATA_GATEWAY_URL}/ipfs/${ipfsFile}`
        const movie = await movieModel.findOneAndUpdate({ _id: id }, { poster: ipfs }, { new: true })
        res.status(200).json({ message: "IMAGE_UPLOADED", movie: movie })
    } catch (err) {
        console.log(err)
        handleHttpError(res, "ERROR_UPLOAD_IMAGE")
    }
}


module.exports = { getMovies, createMovie, updateImage, deleteMovie, restoreMovie, getFavorites, setFavorite, getMovie }