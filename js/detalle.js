document.addEventListener('DOMContentLoaded', () => {
   
    const params = new URLSearchParams(window.location.search);
    const idConcierto = params.get('id');


    const conciertos = JSON.parse(localStorage.getItem('misConciertosData')) || [];
    const concierto = conciertos[idConcierto];

    if (!concierto) {
        document.body.innerHTML = "<h1>Error: Concierto no encontrado</h1>";
        return;
    }
    
    document.getElementById('det-nombre').textContent = concierto.nombre;
    document.getElementById('det-imagen').src = concierto.imagen;
    document.getElementById('det-descripcion').textContent = concierto.descripcion || "Sin descripción disponible.";

    const contenedorHorarios = document.getElementById('det-horarios');
    
    if (concierto.horarios && concierto.horarios.length > 0) {
        concierto.horarios.forEach(h => {
            const div = document.createElement('div');
            div.style.padding = "15px";
            div.style.background = "#222";
            div.style.borderLeft = "5px solid #ff8c00";
            div.innerHTML = `<strong> owo ${h.fecha}</strong> - 📍 ${h.lugar}`;
            contenedorHorarios.appendChild(div);
        });
    } else {
        contenedorHorarios.innerHTML = "<p>No hay fechas programadas.</p>";
    }
});