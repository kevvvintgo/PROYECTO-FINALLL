const mongoose = require ("mongoose");
const Sala = require ("./Models/sala");
const Pelicula = require("./Models/movie");

mongoose.connect("mongodb+srv://kevin:eduardito18@cluster1.yyfcen4.mongodb.net/?appName=Cluster1")
.then (async()=> {
    console.log ("Mongo Conectado");
    const peliculas = await Pelicula.find();
    console.log("Peliculas encontradas: ",peliculas.length);

    for(const peli of peliculas) {
        const existente = await Sala.findOne ({peliculaId: peli._id});
        if(existente) {
            console.log (`Ya existe sala para: ${peli.titulo}`);
        }
        const asientos = [];
        
        for (let fila = 1; fila <=5; fila++) {
            for (let numero = 1; numero <=8; numero++){
                asientos.push({
                    fila,
                    numero,
                    ocupado:false
                });
            }
        }
        await Sala.create({
            peliculaId: peli._id,
            asientos
        });
        console.log(`Sala creada para: ${peli.titulo}`);
    }
    console.log("Listo! Salas Generadas");
    process.exit();
})
    .catch(err => console.log ("Error:", err));