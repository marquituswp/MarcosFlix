module.exports = {
    type: 'object',
    required:["name","lastName","email","dateOfBirth","password"],
    properties:{
        id:{
            type:"string",
            example:"6730bdad0776a521e7e6b9f3"
        },
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
    // Esquema para cambiar el rol de un usuario
    userRole:{
        type:"object",
        required: ["email","role"],
        properties:{
            email:{
                type:"string",
                example:"marcoslopezgarau@gmail.com"
            },
            role:{
                type:"array",
                example:["admin"]
            }
        }
    },
    // Esquema para crear un comentario en una web
    reviewMovie:{
        type:"object",
        required:["scoring","review"],
        properties:{
            scoring:{
                type:"number",
                example: 3
            },
            review:{
                type:"string",
                example: "Buena película"
            },
        }
    },
    UserUpdate:{
        type:"object",
        properties:{
            message:{
                type:"string",
                example:"User updated"
            },
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
            }
        }
    },
    UserUpdateRole:{
        type:"object",
        properties:{
            message:{
                type:"string",
                example:"Role changed"
            }
        }
    },
    UserDelete:{
        type:"object",
        properties:{
            message:{
                type:"string",
                example:"User deleted succesfully"
            }
        }
    },
    UserReviewMovie:{
        type:"object",
        properties:{
            message:{
                type:"string",
                example:"Movie Reviewed"
            },
            title:{
                type:"string",
                example:"Spiderman 1"
            },
            date:{
                type:"date",
                example:"2002-06-21"
            },
            actors:{
                type:"array",
                example:["Tobey Maguire","James Franco"]
            },
            poster:{
                type:"string",
                example:""
            },
            filmGenre:{
                type:"array",
                example:["Superhero"]
            },
            points:{
                type:"number",
                example: 1
            },
            reviews:{
                type:"object",
                properties:{
                    scoring:{
                        type:"number",
                        example: 3
                    },
                    review:{
                        type:"string",
                        example: "Buena experiencia"
                    },
                }
            },
        }
    }
}