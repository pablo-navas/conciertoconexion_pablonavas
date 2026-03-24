document.addEventListener('DOMContentLoaded', () => {
    const contenedor = document.getElementById('cuerpo-tabla-eventos');
    
    function mostrarInventario() {
        const eventos = JSON.parse(localStorage.getItem('misConciertosData')) || [];
        
        if (eventos.length === 0) {
            contenedor.innerHTML = '<tr><td colspan="4" style="color:white; text-align:center;">No hay eventos en el inventario.</td></tr>';
            return;
        }

        contenedor.innerHTML = ''; 
        eventos.forEach((ev, index) => {
            const fila = document.createElement('tr');
            fila.style.borderBottom = "1px solid #ff8c00";
            
            fila.innerHTML = `
                <td><img src="${ev.imagen}" width="60" style="border:1px solid #ff8c00; margin:5px;"></td>
                <td style="color:#ff8c00; padding:10px;"><b>${ev.nombre}</b></td>
                <td style="color:white;">${ev.horarios.length} fechas configuradas</td>
                <td>
                    <button onclick="borrarDeInventario(${index})" 
                            style="background:#ff8c00; color:black; border:none; padding:5px 10px; cursor:pointer; font-weight:bold;">
                        Eliminar
                    </button>
                </td>
            `;
            contenedor.appendChild(fila);
        });
    }

    window.borrarDeInventario = (index) => {
        if (confirm("¿Deseas eliminar este concierto del inventario?")) {
            let eventos = JSON.parse(localStorage.getItem('misConciertosData')) || [];
            eventos.splice(index, 1);
            localStorage.setItem('misConciertosData', JSON.stringify(eventos));
            mostrarInventario();
        }
    };

    mostrarInventario();
});

document.addEventListener('DOMContentLoaded', () => {
    const tabla = document.getElementById('cuerpo-tabla-eventos');

    function cargarInventario() {
        const datosGuardados = JSON.parse(localStorage.getItem('misConciertosData')) || [];
        
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
                    <img src="${evento.imagen}" alt="Poster" style="width:70px; border:2px solid #ff8c00;">
                </td>
                <td style="color:#ff8c00; font-weight:bold; font-size:1.1rem;">
                    ${evento.nombre}
                </td>
                <td style="color:white; font-size:0.9rem;">
                    ${evento.horarios.length} fechas registradas
                </td>
                <td style="text-align:center;">
                    <button onclick="eliminarDelInventario(${index})" 
                            style="background:#ff8c00; color:black; border:none; padding:8px 15px; cursor:pointer; font-weight:bold; border-radius:5px;">
                        ELIMINAR
                    </button>
                </td>
            `;
            tabla.appendChild(fila);
        });
    }

    window.eliminarDelInventario = (index) => {
        if (confirm("¿Seguro que quieres borrar este concierto de la lista, Knight?")) {
            let actual = JSON.parse(localStorage.getItem('misConciertosData')) || [];
            actual.splice(index, 1); 
            localStorage.setItem('misConciertosData', JSON.stringify(actual));
            cargarInventario(); 
        }
    };

    cargarInventario();
});