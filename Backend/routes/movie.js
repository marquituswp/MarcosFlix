const express = require("express")
const router = express.Router()
const { getMovies, createMovie, updateImage, restoreMovie, deleteMovie, setFavorite, getFavorites, getMovie } = require("../controllers/movie")
const { validateGetMovies, validateCreateMovie, validatorUploadImage, validatorDeleteMovie, validatorRestoreMovie, validateGetMovie, validetSetFavorite } = require("../validators/movie")
const { authUser } = require("../middlewares/session")
const { uploadMiddlewareMemory } = require("../utils/handleUpload")
// RUTA GET /users
/**
*   @openapi
*   /movie:
*     get:
*       tags:
*       - Movies
*       summary: Get all Movies with optional filters
*       parameters:
*         - in: query
*           name: title
*           description: 
*           schema:
*             type: string
*         - in: query
*           name: date
*           description: Release date of the movie (must be in format YYYY-MM-DD)
*           schema:
*             type: string
*             format: date  
*         - in: query
*           name: actor
*           description: Filter movies by actor name
*           schema:
*             type: string
*         - in: query
*           name: platforms
*           description: Filter movies by one or more platforms
*           schema:
*             type: array
*             items:
*               type: string
*               enum: ["Netflix", "Amazon Prime Video", "Disney Plus", "MAX", "Apple TV", "Movistar +", "Crunchyroll", "Tio Anime"]
*         - in: query
*           name: genre
*           description: Filter movies by genre (must be one of the predefined values)
*           schema:
*             type: array
*             items:
*               type: string
*             enum: [ "Action", "Adventure", "Comedy", "Drama", "Horror", "Thriller", "Romance", "Science Fiction", "Fantasy", "Documentary", "Animation", "Musical", "Crime", "Mystery", "Western", "Historical", "Biographical", "War", "Family", "Sports", "Teen", "Superhero" ]
*         - in: query
*           name: order
*           schema:
*             type: string
*             enum: ["false","true"]
*           required: true
*           description: Choose "true" to sort movies by scoring 
*         - name: minScoring
*           in: query
*           description: Minimum scoring of the movie reviews
*           schema:
*             type: number
*             enum: [1,2,3,4,5]
*       responses:
*         '200':
*           description: Return a list of Movies
*           content:
*             application/json:
*               schema:
*                 $ref: "#/components/schemas/Movie"
*         '400':
*           description: Invalid parameters or data not found
*           content:
*             application/json:
*               schema:
*                 $ref: "#/components/schemas/Errors/NoMovie"
*/
router.get("/", validateGetMovies, getMovies)

// RUTA GET /movie/favorites
/**
*   @openapi
*   /movie/favorites:
*     get:
*       tags:
*       - Movies
*       summary: Get the favorite Movies
*       parameters:
*         - in: query
*           name: title
*           description: 
*           schema:
*             type: string
*         - in: query
*           name: date
*           description: Release date of the movie (must be in format YYYY-MM-DD)
*           schema:
*             type: string
*             format: date  
*         - in: query
*           name: actor
*           description: Filter movies by actor name
*           schema:
*             type: string
*         - in: query
*           name: platforms
*           description: Filter movies by one or more platforms
*           schema:
*             type: array
*             items:
*               type: string
*               enum: ["Netflix", "Amazon Prime Video", "Disney Plus", "MAX", "Apple TV", "Movistar +", "Crunchyroll", "Tio Anime"]
*         - in: query
*           name: genre
*           description: Filter movies by genre (must be one of the predefined values)
*           schema:
*             type: array
*             items:
*               type: string
*             enum: [ "Action", "Adventure", "Comedy", "Drama", "Horror", "Thriller", "Romance", "Science Fiction", "Fantasy", "Documentary", "Animation", "Musical", "Crime", "Mystery", "Western", "Historical", "Biographical", "War", "Family", "Sports", "Teen", "Superhero" ]
*         - in: query
*           name: order
*           schema:
*             type: string
*             enum: ["false","true"]
*           required: true
*           description: Choose "true" to sort movies by scoring 
*         - name: minScoring
*           in: query
*           description: Minimum scoring of the movie reviews
*           schema:
*             type: number
*             enum: [1,2,3,4,5]
*       security:
*           - bearerAuth: []
*       responses:
*         '200':
*           description: Return a list of Movies
*           content:
*             application/json:
*               schema:
*                 $ref: "#/components/schemas/Movie"
*         '400':
*           description: Invalid parameters or data not found
*           content:
*             application/json:
*               schema:
*                 $ref: "#/components/schemas/Errors/NoMovie"
*/
router.get("/favorites", authUser,validateGetMovies, getFavorites)


// RUTA GET /movie/{id}
/**
*   @openapi
*   /movie/{id}:
*     get:
*       tags:
*       - Movies
*       summary: Get the Movie by ID
*       parameters:
*           - in: path
*             name: id
*             schema:
*               type: string
*             required: true
*             description: The ID of the Movie
*       responses:
*         '200':
*           description: Return a Movie
*           content:
*             application/json:
*               schema:
*                 $ref: "#/components/schemas/Movie"
*         '400':
*           description: Invalid parameters or data not found
*           content:
*             application/json:
*               schema:
*                 $ref: "#/components/schemas/Errors/NoMovie"
*/
router.get("/:id", validateGetMovie, getMovie)

// RUTA POST /movie
/**
*   @openapi
*   /movie:
*   post:
*       tags:
*       - Movies
*       summary: Create a Movies
*       security:
*           - bearerAuth: []
*       requestBody:
*           content:
*               application/json:
*                   schema:
*                       $ref: "#/components/schemas/Movie"
*       responses:
*           '200':
*               description: Return the Movie created
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Movie/MovieCreated"
*           '403':
*               description: Error getting Movie
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Errors/CreateMovie"
*/
router.post("/", authUser, validateCreateMovie, createMovie)

// RUTA PUT /movie/favorite/{id}
/**
*   @openapi
*   /movie/favorite/{id}:
*   put:
*       tags:
*       - Movies
*       summary: Set a Movie as favorite
*       security:
*           - bearerAuth: []
*       parameters:
*           - in: path
*             name: id
*             schema:
*               type: string
*             required: true
*             description: The ID of the Movie
*           - in: query
*             name: isFavorite
*             schema:
*               type: boolean
*               required: true
*               description: Set the Movie as favorite
*       responses:
*           '200':
*               description: Return the Movie created
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Movie/MovieCreated"
*           '403':
*               description: Error getting Movie
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Errors/CreateMovie"
*/
router.put("/favorite/:id", authUser, validetSetFavorite, setFavorite)

// RUTA DELETE /movie/{id}
/**
*   @openapi
*   /movie/{id}:
*   delete:
*       tags:
*       - Movies
*       summary: Delete Movie by ID
*       security:
*           - bearerAuth: []
*       parameters:
*           - in: path
*             name: id
*             schema: 
*                type: string
*             required: true
*             description: The ID of the Movie
*           - in: query
*             name: hard
*             schema:
*               type: string
*               enum: ["true","false"]
*             required: true
*             description: Choose "hard" to delete phisicaly or "false" to soft delete 
*       responses:
*           '200':
*               description: Return a delete message info
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Movie/MovieDelete"
*           '403':
*               description: Error deleting movie
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Errors/MovieDelete"
*           '404':
*               description: Error checking the role
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Errors/NotToken"
*/
router.delete("/:id", authUser, validatorDeleteMovie, deleteMovie)

// RUTA PATCH /movie/{id}
/**
*   @openapi
*   /movie/{id}:
*   patch:
*       tags:
*       - Movies
*       summary: Upload an image to the Movie
*       security:
*           - bearerAuth: []
*       parameters:
*           - in: path
*             name: id
*             schema: 
*                type: string
*             required: true
*             description: The ID of the Movie
*       requestBody:
*         content:
*           multipart/form-data:
*             schema:
*               type: object
*               properties:
*                 image:
*                   type: string
*                   format: binary
*                   description: The image file to upload
*             required:
*               - image
*       responses:
*           '200':
*               description: Return the movie info with the new image uploaded
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Movie/MovieCreated"
*           '403':
*               description: Error uploading image
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Errors/MovieUpload"
*           '404':
*               description: Error checking the role
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Errors/NotToken"
*/
router.patch("/:id", authUser, validatorUploadImage, uploadMiddlewareMemory.single("image"), updateImage)

// RUTA PATCH /movie/restore/{id}
/**
*   @openapi
*   /movie/restore/{id}:
*   patch:
*       tags:
*       - Movies
*       summary: Restore a Movie by ID
*       security:
*           - bearerAuth: []
*       parameters:
*           - in: path
*             name: id
*             schema: 
*                type: string
*             required: true
*             description: The ID of the Movie
*       responses:
*           '200':
*               description: Return the Movie info restored
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Movie/MovieRestored"
*           '403':
*               description: Error restoring movie
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Errors/MovieRestored"
*           '404':
*               description: Error checking the role
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Errors/NotToken"
*/
router.patch("/restore/:id", authUser, validatorRestoreMovie, restoreMovie)

module.exports = router