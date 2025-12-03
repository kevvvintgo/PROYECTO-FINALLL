
async function cargarPeliculas() {
    const res = await fetch ("http://localhost:3000/peliculas");
    const data = await res.json ();
    if(!data.ok){
        alert("Error cargando peliculas");
        return;
    }
    const contenedor = document.getElementById("contenedor");
    contenedor.innerHTML = "";
    data.peliculas.forEach(p => {
        contenedor.innerHTML += `
    <div class="pelicula">
        <img src="${p.posterUrl}" alt="Poster">
        <div class="titulo">${p.titulo}</div>
        <p>${p.genero}</p>
        <p>${p.sinopsis}</p>
        <button onclick="verDetalles ('${p._id}')">Ver Mas</button>
    </div>
        `;
    });
}
function verDetalles(id) {
    window.location.href=`detalles.html?id=${id}`;
}
cargarPeliculas()
data.peliculas.forEach(p => {
    const estreno = new Date(p.lanzamiento);
    const hoy = new Date();
    const esPreventa = estreno > hoy;
    contenedor.innerHTML += `
        <div class="pelicula">
            <img src"${p.posterUrl}" alt="Poster">
            <div class="titulo">${p.titulo}</div>
            ${ esPreventa ? `<span class="preventa">PREVENTA</span>` : "" }
            <p>${p.genero}</p>
            <p>${p.sinopsis}</p>
            <button onclick="verDetalles"('${p._id}')">Ver Mas </button>
        </div>
        `;
});