document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const STORAGE_KEY = 'misConciertosData';
    const CARRITO_KEY = 'carritoTemporal';

    const conciertos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    if (id !== null && conciertos[id]) {
        const evento = conciertos[id];

   
        document.getElementById('det-nombre').textContent = evento.nombre;
        document.getElementById('det-imagen').src = evento.imagen || 'https://via.placeholder.com/300';
        document.getElementById('det-descripcion').textContent = evento.descripcion || "No hay descripción disponible.";
        document.getElementById('det-categoria').textContent = evento.categoria || "General";
        document.getElementById('det-precio').textContent = `Q${evento.precio || 0}`;
        document.getElementById('det-hora').textContent = evento.hora || "Por definir";

        const btnComprar = document.getElementById('btn-comprar-det');
        
        btnComprar.onclick = () => {
            const itemCarrito = {
                nombre: evento.nombre,
                precio: evento.precio || 0,
                imagen: evento.imagen,
                idOriginal: id 
            };

            const carritoActual = JSON.parse(localStorage.getItem(CARRITO_KEY)) || [];
            
            carritoActual.push(itemCarrito);

            localStorage.setItem(CARRITO_KEY, JSON.stringify(carritoActual));

            alert(`carrito!! ¡${evento.nombre} agregado al carrito!`);
            window.location.href = 'carrito.html'; 
        };

    } else {
        document.body.innerHTML = "<h1 style='color:white; text-align:center; margin-top:50px;'>Evento no encontrado 🚫</h1>";
    }
});