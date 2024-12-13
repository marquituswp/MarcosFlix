const {check} = require("express-validator")
const validateResults = require("../utils/handleValidator")

const validateGetMovies = [
    check("title").optional().notEmpty().isString(),
    check("date").optional().notEmpty().isDate(),
    check("actor").optional().notEmpty(),
    check("genre").optional().notEmpty(),
    check("order").optional().notEmpty().isBoolean(),
    check("platforms").optional().notEmpty(),
    check("minScoring").optional().notEmpty().isNumeric(),

    validateResults
]

const validateGetMovie = [
    check("id").exists().notEmpty().isMongoId(),

    validateResults
]

const validetSetFavorite = [
    check("id").exists().notEmpty().isMongoId(),
    check("isFavorite").exists().notEmpty().isBoolean(),

    validateResults
]

const validateCreateMovie = [
    check("title").exists().notEmpty().customSanitizer((value) => {
        return value
            .replace(/\s+/g, ' ')
            .trim()
            .replace(/[^\w\s]/g, '')
            .replace(/\bdos\b/g, '2')
            .replace(/\btres\b/g, '3')
            .replace(/\bcuatro\b/g, '4');
    }), 
    check("date").exists().notEmpty().isDate().customSanitizer((value) => {
        return new Date(value); 
    }),
    check("actors").exists().notEmpty().isArray(),
    check("filmGenre").exists().notEmpty().isArray(),
    check("poster").optional().notEmpty(),
    check("filmGenre").optional().notEmpty(),
    check("platforms").optional().notEmpty(),
    check("reviews").optional().notEmpty().isObject(),
    check("reviews.scoring").optional().notEmpty().isNumeric().custom(value => value >= 0 && value <= 5),
    check("reviews.points").optional().notEmpty().isNumeric(),
    check("reviews.review").optional().notEmpty(),

    validateResults
]

const validatorDeleteMovie = [

    check("id").exists().notEmpty().isMongoId(),

    validateResults

]

// Validaciones para la ruta patch para subir imagen
const validatorUploadImage = [

    check("id").exists().notEmpty().isMongoId(),

    validateResults

]

// Validaciones para la ruta patch para restaurar movie
const validatorRestoreMovie = [
    
    check("id").exists().notEmpty().isMongoId(),

    validateResults
]


module.exports = {validateCreateMovie,validateGetMovies,validatorDeleteMovie,validatorUploadImage,validatorRestoreMovie, validateGetMovie, validetSetFavorite}