document.addEventListener('DOMContentLoaded', () => {
    const contenedor = document.getElementById('grid-eventos'); 
    const inputBusqueda = document.getElementById('input-busqueda');
    const btnFiltro = document.querySelector('.btn-morado'); 
    
    const STORAGE_KEY = 'misConciertosData';
    const conciertosOriginales = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    function renderizar(lista) {

        contenedor.innerHTML = ''; 

        if (lista.length === 0) {
            contenedor.innerHTML = `<h2 style="color:white; text-align:center; width:100%; grid-column: 1/-1;">
                No hay resultados para "${inputBusqueda.value}" 🔍
            </h2>`;
            return;
        }

        lista.forEach((evento, index) => {
            const card = document.createElement('div');
            card.className = 'card-concierto'; 
            
            card.innerHTML = `
                <div class="card-imagen">
                    <img src="${evento.imagen || 'https://via.placeholder.com/400x250'}" alt="${evento.nombre}" style="width:100%;">
                </div>
                <div class="card-info" style="padding: 15px; background: #222; border: 1px solid #ff8c00;">
                    <h3 style="color: #ff8c00; margin: 0;">${evento.nombre}</h3>
                    <p style="color: white; font-size: 0.8rem;">${evento.horarios ? evento.horarios.length : 0} Fechas</p>
                    <button style="background: #ff8c00; color: black; border: none; padding: 5px 10px; cursor: pointer; font-weight: bold;">
                        Comprar
                    </button>
                    <a href="html/detalle.html?id=${index}" style="display:block; margin-top:10px; color: #ff8c00; text-decoration: none; font-size: 0.7rem;">
                        Ver detalles →
                    </a>
                </div>
            `;
            contenedor.appendChild(card);
        });
    }

    const filtrar = () => {
        const termino = inputBusqueda.value.toLowerCase().trim();
        const filtrados = conciertosOriginales.filter(c => 
            c.nombre.toLowerCase().includes(termino)
        );
        renderizar(filtrados);
    };

    inputBusqueda.addEventListener('input', filtrar);

    if(btnFiltro) {
        btnFiltro.addEventListener('click', (e) => {
            e.preventDefault();
            filtrar();
        });
    }
   
    renderizar(conciertosOriginales);
});