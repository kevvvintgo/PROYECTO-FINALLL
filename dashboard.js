const token = localStorage.getItem ("token");
if (!token){
    alert("No estas logueado!!");
    window.location.href = "index.html";
}
function logout() {
    localStorage.removeItem("token");
    window.location.href = "index.html";
}
