const CARRITO_KEY = 'carritoTemporal';
const VENTAS_KEY = 'registroVentas';

document.addEventListener('DOMContentLoaded', () => {
    actualizarTotalInterfaz();

    const contenedorItems = document.getElementById('contenedor-items');
    if (contenedorItems) {
        renderizarListaCarrito();
    }
});

function actualizarTotalInterfaz() {
    const lista = JSON.parse(localStorage.getItem(CARRITO_KEY)) || [];
    const spanTotal = document.getElementById('suma-total');
    if (spanTotal) {
        const total = lista.reduce((acc, item) => acc + parseFloat(item.precio || 0), 0);
        spanTotal.innerText = total.toFixed(2); 
    }
}

function renderizarListaCarrito() {
    const lista = JSON.parse(localStorage.getItem(CARRITO_KEY)) || [];
    const contenedor = document.getElementById('contenedor-items');
    if (!contenedor) return;
    contenedor.innerHTML = '';

    if (lista.length === 0) {
        contenedor.innerHTML = '<p style="color:gray; text-align:center; padding:20px;">Tu carrito está vacío.</p>';
        return;
    }

    lista.forEach((item, index) => {
        const div = document.createElement('div');
        div.style.cssText = "display:flex; justify-content:space-between; align-items:center; padding:15px; border-bottom:1px solid #333; color:white;";
        div.innerHTML = `
            <div>
                <strong style="color:#ff8c00;">${item.nombre}</strong><br>
                <small>Q${parseFloat(item.precio || 0).toFixed(2)}</small>
            </div>
            <button onclick="quitarDelCarrito(${index})" style="background:#ff4444; color:white; border:none; padding:5px 10px; cursor:pointer; border-radius:4px;">Eliminar</button>
        `;
        contenedor.appendChild(div);
    });
}

window.quitarDelCarrito = (index) => {
    let lista = JSON.parse(localStorage.getItem(CARRITO_KEY)) || [];
    lista.splice(index, 1);
    localStorage.setItem(CARRITO_KEY, JSON.stringify(lista));
    renderizarListaCarrito();
    actualizarTotalInterfaz();
};

window.finalizarCompra = () => {
    const checkEdad = document.getElementById('check-edad');
    const cliId = document.getElementById('cli-id');

    if (!cliId) {
        window.location.href = 'cobrese.html';
        return;
    }

    if (!checkEdad || !checkEdad.checked) {
        alert("!!! Debes confirmar que eres mayor de 18 años para continuar.");
        return;
    }

    const datosCliente = {
        id: cliId.value.trim(),
        nombre: document.getElementById('cli-nombre').value.trim(),
        direccion: document.getElementById('cli-direccion').value.trim(),
        telefono: document.getElementById('cli-telefono').value.trim(),
        correo: document.getElementById('cli-correo').value.trim()
    };

    if (!datosCliente.id || !datosCliente.nombre || !datosCliente.correo) {
        alert("X Por favor, completa los campos obligatorios: ID, Nombre y Correo.");
        return;
    }

    const carrito = JSON.parse(localStorage.getItem(CARRITO_KEY)) || [];
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    const historialVentas = JSON.parse(localStorage.getItem(VENTAS_KEY)) || [];
    
    const nuevaVenta = {
        cliente: datosCliente,
        productos: carrito,
        total: carrito.reduce((acc, item) => acc + parseFloat(item.precio || 0), 0),
        fecha: new Date().toLocaleString(),
        idReferencia: "REF-" + Math.floor(Math.random() * 900000 + 100000)
    };

    historialVentas.push(nuevaVenta);
    localStorage.setItem(VENTAS_KEY, JSON.stringify(historialVentas));
    localStorage.removeItem(CARRITO_KEY);

    alert(`¡Compra realizada con éxito!\nGracias por tu compra :D, ${datosCliente.nombre}.`);
    window.location.href = "nomires.html"; 
};