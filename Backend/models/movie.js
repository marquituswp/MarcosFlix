const mongoose = require("mongoose")
const mongooseDelete = require("mongoose-delete")

const movieSchema = new mongoose.Schema(
    {
        title:{
            type:String
        },
        date:{
            type:Date
        },
        actors:{
            type:[String]
        },
        filmGenre:{
            type:[
                "Action",
                "Adventure",
                "Comedy",
                "Drama",
                "Horror",
                "Thriller",
                "Romance",
                "Science Fiction",
                "Fantasy",
                "Documentary",
                "Animation",
                "Musical",
                "Crime",
                "Mystery",
                "Western",
                "Historical",
                "Biographical",
                "War",
                "Family",
                "Sports",
                "Teen",
                "Superhero"
              ]
        },
        poster:{
            type:String,
            default:""
        },
        points:{
            type:Number,
            default:0
        },
        reviews:{
            type:[Object],
            properties:{
                scoring:{
                    type:Number
                },
                review:{
                    type:String
                }
            }
        },
        isFavorite:{
            type:Boolean,
            default: false
        },
        platforms:{
            type:["Netflix", "Amazon Prime Video", "Disney Plus", "MAX", "Apple TV", "Movistar +", "Crunchyroll", "Tio Anime"]
        },
    },
    {
        timestamps:true

})

movieSchema.plugin(mongooseDelete,{overrideMethods:"all"})
module.exports = mongoose.model("movie",movieSchema)