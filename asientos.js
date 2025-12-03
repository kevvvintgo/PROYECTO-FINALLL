function decodeToken(token) {
    const payload = token.split(".")[1];
    const decoded = atob(payload);
    return JSON.parse(decoded);
}

const API_BASE = "http://localhost:3000";
    const params = new URLSearchParams(window.location.search);
    const peliculaId = params.get("peliculaId");
    if (!peliculaId) {
    alert("No se proporcionó peliculaId en la URL.");
    throw new Error("peliculaId missing");
    }

    const contenedor = document.getElementById("contenedorAsientos");
    const reservarBtn = document.getElementById("reservarBtn");
    let sala = null;
    let seleccionados = []; 
    async function cargarSala() {
    contenedor.innerHTML = "Cargando asientos...";
    try {
        const res = await fetch(`${API_BASE}/sala/${peliculaId}`);
        const data = await res.json();
        if (!data.ok) {
        contenedor.innerHTML = "Sala no encontrada.";
        return;
        }
        sala = data.sala;
        dibujarAsientos(sala.asientos);
    } catch (err) {
        console.error(err);
        contenedor.innerHTML = "Error cargando asientos.";
    }
    }


    function dibujarAsientos(asientos) {
    contenedor.innerHTML = "";

    const filasMap = {};
    asientos.forEach(a => {
        const filaKey = String(a.fila);
        if (!filasMap[filaKey]) filasMap[filaKey] = [];
        filasMap[filaKey].push(a);
    });


    const filasOrdenadas = Object.keys(filasMap).sort((x,y) => {

        if (!isNaN(x) && !isNaN(y)) return Number(x)-Number(y);
        return String(x).localeCompare(String(y));
    });

    filasOrdenadas.forEach(filaKey => {
        const filaDiv = document.createElement("div");
        filaDiv.className = "fila";
        const arr = filasMap[filaKey].sort((a,b) => a.numero - b.numero);
        arr.forEach(a => {
        const btn = document.createElement("div");
        btn.className = "asiento";
        btn.textContent = `${a.fila}${a.numero}`;

        if (a.ocupado) {
            btn.classList.add("ocupado");
        } else {
            btn.addEventListener("click", () => toggleSeleccion(btn, a));
        }

        filaDiv.appendChild(btn);
        });
        contenedor.appendChild(filaDiv);
    });
    }

    function toggleSeleccion(dom, asiento) {
    const exists = seleccionados.some(s => s.fila === asiento.fila && s.numero === asiento.numero);
    if (exists) {
        seleccionados = seleccionados.filter(s => !(s.fila === asiento.fila && s.numero === asiento.numero));
        dom.classList.remove("seleccionado");
    } else {
        seleccionados.push({ fila: asiento.fila, numero: asiento.numero });
        dom.classList.add("seleccionado");
    }

    }

reservarBtn.addEventListener("click", async () => {
    
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Debes iniciar sesión antes de reservar.");
        window.location.href = "login.html";
        return;
    }

    const userData = decodeToken(token);
    if (userData.role === "invitado") {
    alert("Debes iniciar sesión con una cuenta real para reservar asientos.");
    window.location.href = "login.html";
    return;
}


    const payload = {
        peliculaId,
        usuarioId: userData.id,   // ← ESTE ES EL USER REAL
        asientos: seleccionados
    };

    console.log("PAYLOAD ENVIADO:", payload);


    reservarBtn.disabled = true;
    reservarBtn.textContent = "Reservando...";

    try {
        const res = await fetch(`${API_BASE}/reservar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (!data.ok) {
        alert("Error: " + (data.message || "No se pudo reservar"));
        reservarBtn.disabled = false;
        reservarBtn.textContent = "Reservar seleccionados";
        return;
        }
        alert(data.message || "Reservación exitosa");
        // refrescar sala para ver asientos ocupados
        seleccionados = [];
        await cargarSala();
    } catch (err) {
        console.error(err);
        alert("Error en la reserva.");
    } finally {
        reservarBtn.disabled = false;
        reservarBtn.textContent = "Reservar seleccionados";
    }
    });

    // inicio
    cargarSala();