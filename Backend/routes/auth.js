const express = require("express")
const router = express.Router()
const {validatorRegister, validateLogin} = require("../validators/auth")
const { uploadMiddlewareMemory } = require("../utils/handleUpload")
const { authUser } = require("../middlewares/session")
const {registerUser, loginUser, uploadProfilePicture} = require("../controllers/auth")

// RUTA POST /auth/register
/**
*   @openapi
*   /auth/register:
*   post:
*       tags:
*       - Auth
*       summary: Register an User
*       requestBody:
*           content:
*               application/json:
*                   schema:
*                       $ref: "#/components/schemas/Auth"
*       responses:
*           '200':
*               description: Return a User registered with its token
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Auth/authResponse"
*           '403':
*               description: Error registering User
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Errors/auth"
*/
router.post("/register",validatorRegister,registerUser)

// RUTA POST /auth/register
/**
*   @openapi
*   /auth/login:
*   post:
*       tags:
*       - Auth
*       summary: Login an User
*       requestBody:
*           content:
*               application/json:
*                   schema:
*                       $ref: "#/components/schemas/Auth/login"
*       responses:
*           '200':
*               description: Return a User logged with its token
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Auth/authResponse"
*           '403':
*               description: Error login User
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Errors/login"
*/
router.post("/login",validateLogin,loginUser)

// RUTA PATCH /auth/{id}
/**
*   @openapi
*   /auth/uploadProfilePicture:
*   patch:
*       tags:
*       - Auth
*       summary: Upload an image to the Auth
*       security:
*           - bearerAuth: []
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
*               description: Return the Auth info with the new image uploaded
*               content:
*                   application/json:
*                       schema:
*                           $ref: "#/components/schemas/Auth/authResponse"
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
router.patch("/uploadProfilePicture", authUser, uploadMiddlewareMemory.single("image"), uploadProfilePicture)

module.exports = router