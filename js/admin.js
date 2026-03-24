document.getElementById('form-login').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email-admin').value;
    const pass = document.getElementById('pass-admin').value;

    if (email === "admin@mail.com" && pass === "123456") {
        alert("¡Bienvenido, Knight!");
        window.location.href = "indexplus.html"; 
    } else {
        alert("Acceso denegado. Revisa tu correo o contraseña.");
    }
});