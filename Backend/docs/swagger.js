const swaggerJsdoc = require("swagger-jsdoc")

const options = {
    definition:{
        openapi:"3.1.0",
        info:{
            title:"Api Películas",
            version:"0.1.0",
            description: "Las películas que más me han gustado"
        },
        servers:[
            {
                url:"http://localhost:3000",
            }
        ],
        components:{
            securitySchemes:{
                bearerAuth:{
                    type:"http",
                    scheme:"bearer",
                },
            },
            schemas:{
                Auth: require("./schemas/auth"),    
                Movie: require("./schemas/movie"),
                Errors: require("./schemas/errors"),
                User: require("./schemas/user")
            }
        }
    },
    apis:["./routes/*.js"]
}

module.exports = swaggerJsdoc(options)