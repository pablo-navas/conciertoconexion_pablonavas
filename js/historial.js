document.addEventListener('DOMContentLoaded', () => {
    cargarHistorial();
});

function cargarHistorial() {
    const VENTAS_KEY = 'registroVentas';
    const tabla = document.getElementById('tabla-ventas');
    
    const ventas = JSON.parse(localStorage.getItem(VENTAS_KEY)) || [];
    const ventasOrdenadas = ventas.reverse(); 

    tabla.innerHTML = '';

    if (ventasOrdenadas.length === 0) {
        tabla.innerHTML = '<tr><td colspan="5" style="text-align:center; padding:50px; color:gray;">No hay ventas registradas aún, Knight.</td></tr>';
        return;
    }

    ventasOrdenadas.forEach(venta => {
        const fila = document.createElement('tr');
        
        const nombresProductos = venta.productos.map(p => p.nombre).join(', ');

        fila.innerHTML = `
            <td>${venta.fecha}</td>
            <td><span class="badge">${venta.idReferencia}</span></td>
            <td>
                <strong>${venta.cliente.nombre}</strong><br>
                <small style="color:gray;">ID: ${venta.cliente.id}</small>
            </td>
            <td style="max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                ${nombresProductos}
            </td>
            <td style="color: #00ff00; font-weight: bold;">Q${venta.total}</td>
        `;
        tabla.appendChild(fila);
    });
}