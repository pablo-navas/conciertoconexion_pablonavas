document.addEventListener('DOMContentLoaded', () => {
    const idSeleccionado = localStorage.getItem('conciertoSeleccionado');
    const todosLosConciertos = JSON.parse(localStorage.getItem('misConciertosData')) || [];

    const evento = todosLosConciertos.find(c => c.id == idSeleccionado);

    if (!evento) {
        console.error("No se encontró el concierto con ID:", idSeleccionado);
        window.location.href = "../index.html";
        return;
    }

    document.getElementById('pub-nombre-concierto').innerText = evento.nombre;
    document.getElementById('pub-descripcion-evento').innerText = evento.descripcion || "Sin descripción disponible.";
    
    const imgDestino = document.getElementById('img-destino');
    if (evento.imagen) {
        imgDestino.src = evento.imagen;
        imgDestino.style.display = "block";
    }

    const contenedorHorarios = document.getElementById('pub-lista-horarios');
    contenedorHorarios.innerHTML = ''; 
    if (evento.horarios && evento.horarios.length > 0) {
        evento.horarios.forEach(h => {
            const item = document.createElement('div');
            item.className = 'item-horario'; 
            
            item.innerHTML = `
                <p style="color: black; font-weight: bold; margin-bottom: 5px;">${h.fecha}</p>
                <p style="color: #4b0082; font-size: 0.9rem; margin: 0;">${h.lugar}</p>
            `;
            contenedorHorarios.appendChild(item);
        });
    } else {
        contenedorHorarios.innerHTML = '<p style="color:white;">Próximamente más fechas...</p>';
    }

    const btnComprar = document.getElementById('btn-comprar-final');
    if (btnComprar) {
        btnComprar.onclick = () => {
            alert(`¡Excelente elección, Knight! Has iniciado la compra para: ${evento.nombre}`);

        };
    }
});