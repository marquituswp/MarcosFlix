module.exports = {
    type: 'object',
    auth:{
        type: 'object',
        properties:{
            message:{
                type:"string",
                example:"ERROR_REGISTER_USER"
            }
        }
    },
    login:{
        type: 'object',
        properties:{
            message:{
                type:"string",
                example:"ERROR_LOGIN_USER"
            }
        }
    },
    RolUser:{
        400:{
            type:"object",
            properties:{
                message:{
                    type:"string",
                    example:"USER_NOT_ALLOWED"
                }
            }
        },
        401:{
            type:"object",
            properties:{
                message:{
                    type:"string",
                    example:"ERROR_CHECKING_ROLE"
                }
            }
        }
        
    },
    NotToken:{
        type:"object",
        properties:{
            message:{
                type:"string",
                example:"NOT_AUTH_TOKEN"
            }
        }
    },
    User:{
        type:"object",
        properties:{
            message:{
                type:"string",
                example:"ERROR_GET_USERS"
            }
        }
    },
    UserUpdate:{
        type:"object",
        properties:{
            message:{
                type:"string",
                example:"ERROR_UPDATING_USER"
            }
        }
    },
    UserUpdateRole:{
        type:"object",
        properties:{
            message:{
                type:"string",
                example:"ERROR_UPDATING_ROLE"
            }
        }
    },
    UserDelete:{
        type:"object",
        properties:{
            message:{
                type:"string",
                example:"ERROR_DELETING_USER"
            }
        }
    },
    Movie:{
        type:"object",
        properties:{
            message:{
                type:"string",
                example:"ERROR_GET_MOVIES"
            }
        }
    },
    CreateMovie:{
        type:"object",
        properties:{
            message:{
                type:"string",
                example:"ERROR_CREATE_MOVIES"
            }
        }
    },
    NoMovie:{
        type:"object",
        properties:{
            message:{
                type:"string",
                example:"NO_MOVIES_DATA"
            }
        }
    },
    UserReviewMovie:{
        type:"object",
        properties:{
            message:{
                type:"string",
                example:"ERROR_REVIEWING_MOVIE"
            }
        }
    },
    MovieUpload:{
        type:"object",
        properties:{
            message:{
                type:"string",
                example:"ERROR_UPLOAD_IMAGE"
            }
        }
    },
    MovieRestored:{
        type:"object",
        properties:{
            message:{
                type:"string",
                example:"ERROR_RESTORE_MOVIE"
            }
        }
    },
    MovieDelete:{
        type:"object",
        properties:{
            message:{
                type:"string",
                example:"ERROR_DELETE_MOVIE"
            }
        }
    },
}