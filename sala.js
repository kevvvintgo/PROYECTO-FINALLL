const mongoose = require("mongoose");

const SalaSchema = new mongoose.Schema ({
    peliculaId: { type: mongoose.Schema.Types.ObjectId, ref:"Movie"},
    numeroSala: Number,
    asientos: [
        {
            fila:String,
            numero:Number,
            ocupado:{type: Boolean, default: false}
        }
    ]
});
module.exports = mongoose.model("Sala", SalaSchema);