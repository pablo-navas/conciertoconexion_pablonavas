document.addEventListener('DOMContentLoaded', () => {
    cargarHistorial();
});

function cargarHistorial() {
    const VENTAS_KEY = 'registroVentas';
    const tabla = document.getElementById('tabla-ventas');
    if (!tabla) return;
    
    const ventas = JSON.parse(localStorage.getItem(VENTAS_KEY)) || [];
    const ventasOrdenadas = [...ventas].reverse(); 

    tabla.innerHTML = '';
    let granTotalRecaudado = 0;

    if (ventasOrdenadas.length === 0) {
        tabla.innerHTML = '<tr><td colspan="5" style="text-align:center; padding:50px; color:gray;">No hay ventas registradas aún, Knight.</td></tr>';
        return;
    }

    ventasOrdenadas.forEach(venta => {
        const fila = document.createElement('tr');
        const nombresProductos = venta.productos.map(p => p.nombre).join(', ');
        granTotalRecaudado += parseFloat(venta.total || 0);

        fila.innerHTML = `
            <td>${venta.fecha}</td>
            <td><span class="badge" style="background:#444; padding:2px 6px; border-radius:4px; font-size:0.8rem;">${venta.idReferencia}</span></td>
            <td>
                <strong>${venta.cliente.nombre}</strong><br>
                <small style="color:gray;">ID: ${venta.cliente.id}</small>
            </td>
            <td style="max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${nombresProductos}">
                ${nombresProductos}
            </td>
            <td style="color: #00ff00; font-weight: bold;">Q${parseFloat(venta.total).toFixed(2)}</td>
        `;
        tabla.appendChild(fila);
    });

    const filaTotal = document.createElement('tr');
    filaTotal.innerHTML = `
        <td colspan="4" style="text-align:right; font-weight:bold; padding:15px; color:#ff8c00;">TOTAL RECAUDADO:</td>
        <td style="color: #00ff00; font-weight: bold; font-size: 1.2rem; background: #222;">Q${granTotalRecaudado.toFixed(2)}</td>
    `;
    tabla.appendChild(filaTotal);
}