const express = require('express')
const cors = require("cors")
require("dotenv").config()
const dbConnect = require("./config/mongo")
const app = express()
const swaggerUi = require("swagger-ui-express")
const swaggerDocs = require("./docs/swagger")

app.use(cors())
app.use(express.json())

app.use("/",require("./routes"))
app.use("/swagger",swaggerUi.serve,swaggerUi.setup(swaggerDocs))
app.use(express.static("storage"))

dbConnect()

module.exports=app