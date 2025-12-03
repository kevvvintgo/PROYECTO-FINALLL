const mongoose = require("mongoose");

const MovieSchema =  new mongoose.Schema ({
    titulo: {type:String, required:true},
    genero: String,
    sinopsis: String,
    duracion: String,
    posterUrl: String,
    lanzamiento: Date,
    funciones: [
        {
            fecha: String,
            horarios: [String],
        }
    ],
    createdAt: { type: Date, default: Date.now}
});
module.exports =  mongoose.model("Movie", MovieSchema);