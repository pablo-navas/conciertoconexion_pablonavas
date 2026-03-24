document.addEventListener('DOMContentLoaded', () => {
    const contenedor = document.getElementById('grid-eventos');
    

    const conciertosData = JSON.parse(localStorage.getItem('misConciertosData')) || [];

    if (conciertosData.length === 0) {
        contenedor.innerHTML = '<p style="color:white; text-align:center; grid-column: 1/-1;">No hay eventos disponibles por ahora. ¡Vuelve pronto!</p>';
        return;
    }

  
    contenedor.innerHTML = '';

    conciertosData.forEach(evento => {
        const cubito = document.createElement('div');
        cubito.className = 'box-placeholder'; 
        
        cubito.innerHTML = `
            <div style="width:100%; height:180px; overflow:hidden; border-radius:10px 10px 0 0;">
                <img src="${evento.imagen}" alt="${evento.nombre}" style="width:100%; height:100%; object-fit:cover;">
            </div>
            <div style="padding:15px; text-align:center; background-color:#ffb700; border-radius:0 0 10px 10px;">
                <h3 style="color:black; margin:0 0 10px 0; font-size:1.1rem;">${evento.nombre}</h3>
                
                <button onclick="verEspejoEvento('${evento.id}')" 
                        style="background:black; color:#ffb700; border:none; padding:8px 15px; cursor:pointer; font-weight:bold; width:100%;">
                    Comprar
                </button>
            </div>
        `;
        contenedor.appendChild(cubito);
    });
});


window.verEspejoEvento = function(id) {
    localStorage.setItem('conciertoSeleccionado', id);
    window.location.href = 'html/evento-pub.html';
};

window.verEspejoEvento = function(id) {
    localStorage.setItem('conciertoSeleccionado', id);

    window.location.href = 'html/evento-pub.html';
};
