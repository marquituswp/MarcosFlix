// Multer es un middleware para Node.js que facilita la carga de archivos. Gestiona la carga de archivos y almacena los archivos en el disco.
const multer = require("multer")

const storage = multer.diskStorage({

    filename: function (req, file, callback) { //Sobreescribimos o renombramos

        //Tienen extensión jpg, pdf, mp4

        const ext = file.originalname.split(".").pop() //el último valor

        const filename = "file-" + Date.now() + "." + ext //Nombre del archivo: file-123456789.jpg

        callback(null, filename)

    },

});
const memory = multer.memoryStorage()
const uploadMiddlewareMemory = multer({storage: memory})

const uploadMiddleware = multer({storage}) //Middleware entre la ruta y el controlador

module.exports = { uploadMiddleware, uploadMiddlewareMemory }