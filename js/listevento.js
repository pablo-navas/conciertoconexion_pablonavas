document.addEventListener('DOMContentLoaded', () => {
    const tabla = document.getElementById('lista-inventario-body');
    const STORAGE_KEY = 'misConciertosData';

    function cargarInventario() {
        const datosGuardados = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        tabla.innerHTML = '';

        if (datosGuardados.length === 0) {
            tabla.innerHTML = `<tr><td colspan="6" style="color:white; text-align:center; padding:20px;">No hay conciertos.</td></tr>`;
            return;
        }

        datosGuardados.forEach((evento, index) => {
            const fila = document.createElement('tr');
            fila.style.borderBottom = "1px solid #333"; 

            fila.innerHTML = `
                <td><img src="${evento.imagen || ''}" class="img-mini"></td>
                <td>
                    <span style="color:#ff8c00; font-weight:bold;">${evento.nombre}</span><br>
                    <small style="color:gray;">${evento.categoria || 'Sin cat.'}</small>
                </td>
                <td style="color: #00ff00; font-weight: bold;">Q${evento.precio || 0}</td>
                <td>${evento.hora || '--:--'}</td>
                <td style="color: #666;">#${index}</td>
                <td style="text-align: center;">
                    <button onclick="editarEvento(${index})" style="background:#ffb700; color:black; border:none; padding:5px 10px; cursor:pointer; border-radius:3px; margin-right:5px; font-weight:bold;">EDITAR</button>
                    <button onclick="eliminarDelInventario(${index})" class="btn-borrar">BORRAR</button>
                </td>
            `;
            tabla.appendChild(fila);
        });
    }

    window.editarEvento = (index) => {
        window.location.href = `eventos.html?editId=${index}`;
    };

    window.eliminarDelInventario = (index) => {
        if (confirm("¿Borrar concierto, Knight?")) {
            let actual = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
            actual.splice(index, 1); 
            localStorage.setItem(STORAGE_KEY, JSON.stringify(actual));
            cargarInventario(); 
        }
    };

    cargarInventario();
});