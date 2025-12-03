const params = new URLSearchParams(window.location.search);
const movieID = params.get("id");

if (!movieID) {
    alert("No se proporciono un ID de pelicula!!!");
}

fetch(`http://localhost:3000/peliculas/${movieID}`)
    .then(res => res.json())
    .then(data => {
        if (!data.ok) return alert("Pelicula no encontrada!!");

        const p = data.pelicula;
        document.getElementById("btnAsientos").addEventListener("click", () => {
    window.location.href = `asientos.html?peliculaId=${p._id}`;
});

        document.getElementById("titulo").textContent = p.titulo;
        document.getElementById("poster").src = p.posterUrl;
        document.getElementById("genero").textContent = p.genero;
        document.getElementById("duracion").textContent = p.duracion;
        document.getElementById("sinopsis").textContent = p.sinopsis;

        const fechaBonita = new Date(p.lanzamiento).toLocaleDateString("es-MX", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
        document.getElementById("lanzamiento").textContent = fechaBonita;

        const listaFunciones = document.getElementById("funciones");
        listaFunciones.innerHTML = "";

        p.funciones.forEach(F => {
            const li = document.createElement("li");
            li.textContent = `${F.fecha} - ${(F.horarios || []).join(", ")}`;
            listaFunciones.appendChild(li);
        });
    });
    
    const estreno = new Date(p.lanzamiento);
    const hoy = new Date ();
    if(estreno > hoy) {
        document.getElementById("titulo").innerHTML += "<span class='preventa'>PREVENTA</span>";
    }
