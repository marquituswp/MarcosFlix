module.exports = {
    type:"object",
    require:["title","date","actors","poster","filmGenre","platforms"],
    properties:{
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
        filmGenre:{
            type:"array",
            example:["Superhero"]
        },
        platforms:{
            type:"array",
            example:["Netflix"]
        },
    },
    MovieCreated:{
        type:"object",
        properties:{
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
                example: 0
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
    },
    MovieDelete:{
        type:"object",
        properties:{
            message:{
                type:"string",
                example:"MOVIE_DELETED_PHISICALY"
            }
        }
    },
    MovieRestored:{
        type:"object",
        properties:{
            message:{
                type:"string",
                example:"MOVIE_RESTORED"
            },
            movie:{
                type:"object",
                properties:{
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
                        example: 0
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
    },
}