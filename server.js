
const express = require ("express");
const cors = require("cors");
const app = express();
const User = require("./models/users");
const jwt = require ("jsonwebtoken");
const Pelicula = require("./Models/movie");
const Sala = require("./Models/sala");
const Reservacion = require("./Models/reservacion");



app.use(cors());
app.use (express.json());

app.get("/",(req, res) =>{
    res.send("Servidor Audify Funcionando!!");
});
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://kevin:eduardito18@cluster1.yyfcen4.mongodb.net/?appName=Cluster1")
.then (() => console.log("MongoDB conectado"))
.catch(err => console.log("Error conectado MngoDB",err));
app.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;

        const userExist = await User.findOne({ email });
        if (userExist) {
            console.log(" El correo ya existe:", email);
            return res.status(400).send({ ok: false, message: "El correo ya está registrado" });
        }

        const newUser = new User({ email, password });
        await newUser.save();

        console.log(" Usuario guardado en Mongo:", email);

        res.send({ ok: true, message: "Usuario registrado con éxito" });
    } catch (err) {
        console.error(" ERROR al registrar:", err);
        res.status(500).send({ ok: false, message: "Error en el servidor" });
    }
});
const SECRET_KEY = "kevinydiego";

app.post("/login", async (req, res) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({email});

        if (!user) {
            return res.status (401).send({ok:false, message: "Correo no registrado"});
        }

        if (user.password !== password ){
            return res.status(401).send({ok:false, message:"Contraseña Incorrecta"});
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            SECRET_KEY,
            { expiresIn: "1h" }
        );

        res.send({ ok:true, message:"Login Exitoso", token, userId:user._id });
    } catch (err){
        console.error("Error Login", err);
        res.status (500).send({ok:false, message:"Error en el servidor!!"});
    }
});
app.get ("/peliculas", async (req,res) => {
    try {
        const peliculas =  await Pelicula.find();
        res.send ({ ok:true, peliculas});
    } catch (err) {
        console.error ("Error get peliculas: ", err);
        res.status(500).send ({ok:false, message:"Error en el servidor"});
    }
});
app.get ("/peliculas/:id", async (req,res) => {
    try {
        const pelicula = await Pelicula.findById(req.params.id);
        if(!pelicula) return res.status (404).send ({ok:false, message:"No encontrada"})
            res.send({ok:true, pelicula});
    }catch(err) {
        console.error("Error get pelicula: ", err);
        res.status (500).send ({ok:false, message:"Error en el servidor"});
    }
});
app.post("/peliculas", async (req,res) => {
    try {
        const data = req.body;
        const nueva = new Pelicula(data);
        await nueva.save();
        res.send({ok:true, pelicula: nueva});
    }catch (err){
        console.error ("Eroor en crear pelicula: ", err);
        res.status(500).send({ok:false, message: "Error Servidor", error: err.message});
    }
});
app.get ("/cartelera", async (req,res)=>{
    const  hoy = new Date();
    const peliculas = await Pelicula.find({lanzamiento: { $lte: hoy}});
    res.send ({ok:true, peliculas});
});
app.get ("/preventa", async (req,res)=> {
    const hoy = new Date();
    const peliculas = await Pelicula.find({lanzamiento: {$gt: hoy}});
    res.send ({ok:true, peliculas});
});
app.get ("/sala/:peliculaId", async (req,res)=>{
    try{
        const sala = await Sala.findOne ({peliculaId: req.params.peliculaId});
        if(!sala) return res.send({ok:false, message:"Sala no encontrada!"});
        res.send({ok:true, sala});
    } catch (err) {
        res.status (500).send({ok:false,message:"Error servidor"});
    }
});
app.post("/reservar", async (req,res) => {
    try{
        const {peliculaId, asientos, usuarioId} = req.body;
        const sala = await Sala.findOne ({peliculaId});
        if(!sala) return res.send ({ok:false, message:"Sala no encntrada"});
        asientos.forEach(sel => {
            const asiento = sala.asientos.find(
                a => a.fila === sel.fila && a.numero === sel.numero 
            );
            if (asiento) asiento.ocupado = true;
        });
        await sala.save();
        await Reservacion.create({
    usuarioId,
    peliculaId,
    asientos
    });
        res.send({ok:true, message:"Asientos reservados co exito"});
    } catch (err) {
        res.status(500).send ({ok:false, message:"Error servidor"});
        }
    
});
app.post("/crear-sala", async (req, res) => {
    try {
        const sala = await Sala.create({
            peliculaId: "ID_DE_TU_PELICULA",
            asientos: [
                { fila: "A", numero: 1, ocupado: false },
                { fila: "A", numero: 2, ocupado: false },
                { fila: "B", numero: 1, ocupado: false }
            ]
        });

        res.send({ ok: true, sala });
    } catch (err) {
        res.send({ ok: false, error: err.message });
    }
});

app.use("/imagenes", express.static("imagenes"));
const fs = require("fs");

console.log("¿Existe el archivo?: ", fs.existsSync("./Models/movie.js"));
console.log("Directorio actual: ", __dirname);

app.listen(3000, () => {
    console.log ("Servidor escuchando en http://localhost:3000");
});

