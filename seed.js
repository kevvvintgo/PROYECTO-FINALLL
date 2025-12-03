const mongoose = require ("mongoose");
const Pelicula = require ("./Models/movie");

mongoose.connect("mongodb+srv://kevin:eduardito18@cluster1.yyfcen4.mongodb.net/?appName=Cluster1")
    .then(async () => {
        console.log ("Mongo OK");
        await Pelicula.deleteMany({});
        const item = [
            {
                titulo: "Wicked:For Good",
                genero: "Musical/Fantasia",
                sinopsis: "Ahora demonizada como la Malvada Bruja del Oeste, Elphaba vive exiliada en el bosque de Oz, mientras que Glinda reside en el palacio de Ciudad Esmeralda, disfrutando de la fama y la popularidad. Mientras una turba furiosa se alza contra la Malvada Bruja, deberá reunirse con Glinda para transformarse a sí misma y a todo Oz para siempre.",
                duracion: "2h 17m",
                posterUrl: "http://localhost:3000/imagenes/wicked.jpg",
                lanzamiento: new Date("2025-11-21"),
                funciones: [{ 
                    fecha:"2025-12-04",
                    horarios:["2:30pm","5:30pm","8:30pm"]
                }]
            },
            
            {
                titulo: "Depredador: Tierras Salvajes",
                genero: "Ciencia Ficcion/Terror",
                sinopsis: "Predator: Badlands es una película de acción y ciencia ficción estadounidense de la franquicia Depredador. Es la séptima película de la serie principal y la novena de la franquicia en general.",
                duracion: "1h 50m",
                posterUrl: "http://localhost:3000/imagenes/depredador.jpg",
                lanzamiento: new Date("2025-11-6"),
                funciones: [{ 
                    fecha:"2025-12-05",
                    horarios:["4:30pm","5:30pm","6:30pm", "8:30pm"]
                }],
            },
            {
                titulo: "Zootopia 2",
                genero: "Ciencia Ficcion/Terror",
                sinopsis: "Los detectives Judy Hopps y Nick Wilde se encuentran tras la sinuosa pista de un misterioso reptil que revoluciona la metrópolis mamífera de Zootopia.",
                duracion: "1h 48m",
                posterUrl: "http://localhost:3000/imagenes/zoo.jpg",
                lanzamiento: new Date("2025-11-27"),
                funciones: [{ 
                    fecha:"2025-12-05",
                    horarios:["4:30pm","5:30pm","6:30pm", "8:30pm"]
                }],
            },
            {
                titulo: "Los Ilusionistas 3: Nada Es Lo Que Parece",
                genero: "Suspenso",
                sinopsis: "Los Cuatro Jinetes están de regreso… y no vienen solos. Una nueva generación de ilusionistas se une al equipo para llevar la magia al siguiente nivel. Más giros, más trampas, más espectáculo. Nada es lo que parece... y esta vez, menos que nunca.",
                duracion: "1h 53m",
                posterUrl: "http://localhost:3000/imagenes/los3.jpg",
                lanzamiento: new Date("2025-11-13"),
                funciones: [{ 
                    fecha:"2025-12-05",
                    horarios:["4:30pm","5:30pm","6:30pm", "8:30pm"]
                }],
            },
            {
                titulo: "El telefono Negro 2",
                genero: "Suspenso/Terror",
                sinopsis: "Cuatro años después de que Finney escapara del temible “Grabber”, el joven intenta rehacer su vida. Su hermana Gwen vuelve a recibir inquietantes llamadas del teléfono negro y visiones de tres chicos perseguidos en un campamento invernal. Para detener el ciclo, los hermanos viajarán a Alpine Lake, donde descubrirán que el mal no solo ha regresado, sino que es aún más poderoso.",
                duracion: "1h 54m",
                posterUrl: "http://localhost:3000/imagenes/elt2.jpg",
                lanzamiento: new Date("2025-10-16"),
                funciones: [{ 
                    fecha:"2025-12-05",
                    horarios:["4:30pm","5:30pm","6:30pm", "8:30pm"]
                }],
            },
            {
                titulo: "Soy Frankelda",
                genero: "Animacion/Fantasia",
                sinopsis: "Frankelda es una joven escritora de terror del siglo XIX. Un día es visitada por el príncipe de los sustos y junto con él viajará al Reino de las pesadillas, donde tendrá que escribir historias de terror y asustar al mundo real sin que otras pesadillas se lo impidan.",
                duracion: "1h 44m",
                posterUrl: "http://localhost:3000/imagenes/frank.jpg",
                lanzamiento: new Date("2025-10-23"),
                funciones: [{ 
                    fecha:"2025-12-05",
                    horarios:["4:30pm","5:30pm","6:30pm", "8:30pm"]
                }],
            },
            {
                titulo: "Avatar: Fire And Ash",
                genero: "Fantasia/Acciom",
                sinopsis: "El conflicto en Pandora se intensifica cuando la familia de Jake y Neytiri se encuentra con una nueva y agresiva tribu Na'vi.",
                duracion: "3h 05m",
                posterUrl: "http://localhost:3000/imagenes/avatar.jpg",
                lanzamiento: new Date("2025-12-19"),
                funciones: [{ 
                    fecha:"2025-12-19",
                    horarios:["4:30pm","7:30pm","10:30pm"]
                }],
                estado:"preventa"
            },
            {
                titulo: "Five Nights at Freddy's 2",
                genero: "Fantasia/Accion",
                sinopsis: "Ha pasado un año desde la pesadilla sobrenatural en Freddy Fazbear's Pizza. El exguardia de seguridad Mike le ha ocultado la verdad a su hermana de 11 años, Abby, sobre el destino de sus amigos animatrónicos.",
                duracion: "1h 44m",
                posterUrl: "http://localhost:3000/imagenes/fnaf2.jpg",
                lanzamiento: new Date("2025-12-4"),
                funciones: [{ 
                    fecha:"2025-12-19",
                    horarios:["4:30pm","5:30pm","6:30pm", "8:30pm"]
                }],
                estado:"preventa"
            },
            {
                titulo: "Eternidad",
                genero: "Romance/Comedia",
                sinopsis: "En una otra vida donde las almas tienen una semana para decidir dónde pasar la eternidad, Joan se enfrenta a la imposible elección entre el hombre con el que pasó su vida y su primer amor, que murió joven y ha esperado décadas para que ella llegara.",
                duracion: "1h 54m",
                posterUrl: "http://localhost:3000/imagenes/eternity.jpg",
                lanzamiento: new Date("2025-12-04"),
                funciones: [{ 
                    fecha:"2025-12-05",
                    horarios:["4:30pm","5:30pm","6:30pm", "8:30pm"]
                }],
                estado:"preventa"
            },
            {
                titulo: "Bugonia",
                genero: "Thriller",
                sinopsis: "Dos hombres ricos viajan a un pueblo extranjero para escapar de una crisis global, pero su plan se convierte en una pesadilla cuando los lugareños los involucran en rituales extraños y perturbadores.",
                duracion: "1h 58m",
                posterUrl: "http://localhost:3000/imagenes/bug.jpg",
                lanzamiento: new Date("2025-12-04"),
                funciones: [{ 
                    fecha:"2025-12-05",
                    horarios:["4:30pm","5:30pm","6:30pm", "8:30pm"]
                }],
                estado:"preventa"
            },
            



        ];

        await Pelicula.insertMany(item);
        console.log("Seed OK");
        process.exit();
    })
    .catch (err => {
        console.error("Mongo error seed", err);
        process.exit(1);
    });