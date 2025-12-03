const mongoose = require("mongoose");
const ReservacionSchema = new mongoose.Schema({
    usuarioId: String,
    peliculaId: String,
    asientos: Array,
    fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Reservacion", ReservacionSchema);
