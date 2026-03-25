document.addEventListener('DOMContentLoaded', () => {
    const contenedor = document.getElementById('grid-eventos');
    const inputBusqueda = document.getElementById('input-busqueda');
    
    const STORAGE_KEY = 'misConciertosData';
    const conciertos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    function mostrarEventos(lista) {
        contenedor.innerHTML = '';
        
        lista.forEach((evento) => {

            const indexOriginal = conciertos.indexOf(evento);
            
            const card = document.createElement('div');
            // matematicas hijo podras negarlo pero los numeros no mienteeeeen
            card.innerHTML = `
                <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 10px; text-align: center;">
                    <img src="${evento.imagen}" style="width: 100%; border-radius: 5px;">
                    <h2 style="color: #ff8c00; margin: 10px 0 5px;">${evento.nombre}</h2>
                    <p style="color: #666; text-transform: uppercase; font-size: 0.8rem;">${evento.categoria}</p>
                    
                    <button onclick="window.location.href='html/detalle.html?id=${indexOriginal}'" 
                            style="background: black; color: #ff8c00; border: 1px solid #ff8c00; padding: 10px; width: 100%; font-weight: bold; cursor: pointer; margin: 10px 0;">
                        Comprar Q${evento.precio}
                    </button>
                    
                    <a href="html/detalle.html?id=${indexOriginal}" style="color: white; font-size: 0.8rem; text-decoration: none; opacity: 0.7;">
                        Más información
                    </a>
                </div>
            `;
            contenedor.appendChild(card);
        });
    }

    inputBusqueda.addEventListener('input', () => {
        const texto = inputBusqueda.value.toLowerCase();
        const filtrados = conciertos.filter(c => 
            c.nombre.toLowerCase().includes(texto) || 
            c.categoria.toLowerCase().includes(texto)
        );
        mostrarEventos(filtrados);
    });

    mostrarEventos(conciertos);
});