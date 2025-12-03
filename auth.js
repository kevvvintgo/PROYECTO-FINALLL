function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    })
    .then(res => res.json().then(data => ({ status: res.status, data })))
    .then(result => {
        function decodeToken(token) {
    const payload = token.split(".")[1];
    const decoded = atob(payload);
    return JSON.parse(decoded);
}
        if (result.data.ok) {
            localStorage.setItem("token", result.data.token);
            alert("Bienvenido!!");
            window.location.href = "Home.html";
        } else {
            alert(result.data.message);
        }
    })
    .catch(err => console.error("Error en login:", err));
}
function continuarInvitado() {
    const payload = {
        id: "invitado_" + Date.now(),
        email: "invitado@cine.com",
        role: "invitado"
    };

    const base64Payload = btoa(JSON.stringify(payload));

    const fakeJWT = `xxx.${base64Payload}.yyy`;

    localStorage.setItem("token", fakeJWT);

    alert("Entraste como invitado.");
    window.location.href = "Home.html";
}

