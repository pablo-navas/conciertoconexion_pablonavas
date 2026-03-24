document.addEventListener('DOMContentLoaded', () => {
    const tabla = document.getElementById('lista-inventario-body');
    const STORAGE_KEY = 'misConciertosData';

    function cargarInventario() {
        const datosGuardados = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        
        tabla.innerHTML = '';

        if (datosGuardados.length === 0) {
            tabla.innerHTML = `<tr><td colspan="4" style="color:white; text-align:center; padding:20px;">
                No hay conciertos en el inventario. ¡Ve a crear uno!
            </td></tr>`;
            return;
        }

        datosGuardados.forEach((evento, index) => {
            const fila = document.createElement('tr');
            fila.style.borderBottom = "1px solid #ff8c00"; 

            fila.innerHTML = `
                <td style="padding:10px;">
                    <img src="${evento.imagen || 'https://via.placeholder.com/70'}" alt="Poster" style="width:70px; border:2px solid #ff8c00; border-radius:5px;">
                </td>
                <td style="vertical-align: middle;">
                    <a href="detalle.html?id=${index}" style="color:#ff8c00; font-weight:bold; font-size:1.1rem; text-decoration:none;">
                        ${evento.nombre} 👁️
                    </a>
                    <br>
                    <small style="color:gray;">${evento.horarios ? evento.horarios.length : 0} fechas registradas</small>
                </td>
                <td style="vertical-align: middle; text-align: center;">
                    <button onclick="editarEvento(${index})" 
                            style="background: #222; color: #ff8c00; border: 1px solid #ff8c00; padding: 5px 10px; cursor: pointer; border-radius: 5px; margin-right: 5px;">
                        EDITAR ✏️
                    </button>
                </td>
                <td style="vertical-align: middle; text-align: center;">
                    <button onclick="eliminarDelInventario(${index})" 
                            style="background:#ff4444; color:white; border:none; padding:8px 15px; cursor:pointer; font-weight:bold; border-radius:5px;">
                        BORRAR 🗑️
                    </button>
                </td>
            `;
            tabla.appendChild(fila);
        });
    }

    // Navegar al editor con el ID (para la cirugía de edición)
    window.editarEvento = (index) => {
        window.location.href = `evento.html?editId=${index}`;
    };

    // Eliminar del sistema
    window.eliminarDelInventario = (index) => {
        if (confirm("¿Seguro que quieres borrar este concierto, Knight?")) {
            let actual = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
            actual.splice(index, 1); 
            localStorage.setItem(STORAGE_KEY, JSON.stringify(actual));
            cargarInventario(); 
        }
    };

    cargarInventario();
});