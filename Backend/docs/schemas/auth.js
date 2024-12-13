module.exports = {
    type:"object",
    required:["name","lastName","email","dateOfBirth","password"],
    properties:{
        name:{
            type:"string",
            example:"Marcos"
        },
        lastName:{
            type:"string",
            example:"López"
        },
        email:{
            type:"string",
            example:"marcoslopezgarau@gmail.com"
        },
        dateOfBirth:{
            type:"date",
            example:"2001-11-19"
        },
        password:{
            type:"string",
            example:"1234567890"
        }
    },
    // Esquema para loguear un usuario
    login: {
        type: "object",
        required: ["email", "password"],
        properties: {
            email: {
                type: "string",
                example: "marcoslopezgarau@gmail.com"
            },
            password: {
                type: "string",
                example: "1234567890"
            },
        }
    },
    // Esquema ejemplo respuesta auth
    authResponse: {
        type: "object",
        properties: {
            token: {
                type: "string",
                example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIzNUB0ZXN0LmNvbSIsImlhdCI6MTYyNjIwNjQwMCwiZXhwIjoxNjI2MjA2NDAwfQ"

            },
            user: {
                type: "object",
                properties: {
                    name:{
                        type:"string",
                        example:"Marcos"
                    },
                    lastName:{
                        type:"string",
                        example:"López"
                    },
                    email:{
                        type:"string",
                        example:"marcoslopezgarau@gmail.com"
                    },
                    dateOfBirth:{
                        type:"date",
                        example:"2001-11-19"
                    },
                    password:{
                        type:"string",
                        example:"1234567890"
                    },
                    role:{
                        type:"array",
                        example:["user"]
                    },
                    profilePicture:{
                        type:"string",
                        example:"https://www.google.com"
                    }
                }
            }
        }
    }
}