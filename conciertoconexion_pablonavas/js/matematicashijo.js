document.addEventListener('DOMContentLoaded', () => {
    const destacadosUI = document.getElementById('destacados-ui');
    const gridEventos = document.getElementById('grid-eventos');

    const eventos = JSON.parse(localStorage.getItem('misConciertosData')) || [];

    destacadosUI.innerHTML = '';
    gridEventos.innerHTML = '';

    eventos.forEach(evento => {
        const nuevaTarjeta = document.createElement('tarjeta-concierto');
        nuevaTarjeta.setAttribute('nombre', evento.nombre);
        nuevaTarjeta.setAttribute('imagen', evento.imagen);

        if (evento.destacado) {
            nuevaTarjeta.setAttribute('tipo', 'destacado');
            destacadosUI.appendChild(nuevaTarjeta);
        } else {
            nuevaTarjeta.setAttribute('tipo', 'normal');
            gridEventos.appendChild(nuevaTarjeta);
        }
    });

    if (eventos.length === 0) {
        gridEventos.innerHTML = `<p style="color:black; grid-column: 1/4; text-align:center;">
            Aún no hay conciertos programados. ¡Vuelve pronto!
        </p>`;
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const gridEventos = document.getElementById('grid-eventos');
    const eventos = JSON.parse(localStorage.getItem('misConciertosData')) || [];

    if (eventos.length === 0) {
        gridEventos.innerHTML = `<p style="color:black; grid-column: 1/4; text-align:center;">No hay conciertos disponibles.</p>`;
        return;
    }

    eventos.forEach(evento => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'tarjeta-inicio';
        tarjeta.innerHTML = `
            <div class="foto-contenedor">
                <img src="${evento.imagen}" alt="${evento.nombre}" style="width:100%; height:100%; object-fit:cover;">
            </div>
            <span class="nombre-concierto" style="color:#ff8c00; font-weight:bold;">${evento.nombre}</span>
            <button onclick="abrirCarrito(${JSON.stringify(evento).replace(/"/g, '&quot;')})" 
                    style="background:#000; color:#ff8c00; border:1px solid #ff8c00; cursor:pointer; margin-top:5px;">
                Comprar
            </button>
        `;
        gridEventos.appendChild(tarjeta);
    });
});