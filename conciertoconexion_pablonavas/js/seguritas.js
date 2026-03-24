document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('form-login');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Evita que la página se recargue

            // Capturamos lo que escribió el Knight
            const nombre = document.getElementById('nombre-admin').value;
            const email = document.getElementById('email-admin').value;
            const pass = document.getElementById('pass-admin').value;

            // LA LLAVE MAESTRA
            // Aquí validamos: Correo y Password
            if (email === "admin@gmail.com" && pass === "123456") {
                
                alert(`¡Bienvenido de nuevo, ${nombre}! Acceso concedido.`);
                
                // Guardamos el nombre en la memoria por si quieres saludarlo en el panel
                localStorage.setItem('adminNombre', nombre);

                // REDIRECCIÓN A TU PANEL
                window.location.href = "indexplus.html";

            } else {
                alert("Datos incorrectos. ¡Solo el administrador tiene paso por aquí!");
            }
        });
    }
});