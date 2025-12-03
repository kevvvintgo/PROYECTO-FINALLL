const token = localStorage.getItem ("token");
if (!token){
    alert("No estas logueado!!");
    window.location.href = "login.html";
}
function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}
