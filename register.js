function registrar() {
    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const password2 = document.getElementById("password2").value;

    if (password !== password2) {
        alert("Las contraseñas no coinciden");
        return;
    }

    fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password }) 
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);

        if (data.ok) {
            window.location.href = "index.html";
        }
    })
    .catch(err => console.error("Error al registrar:", err));
}

