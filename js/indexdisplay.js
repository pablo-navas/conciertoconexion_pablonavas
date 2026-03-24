document.addEventListener('DOMContentLoaded', () => {
    const contenedor = document.getElementById('grid-eventos');
    const inputBusqueda = document.getElementById('input-busqueda');
    const btnFiltroMorado = document.querySelector('.btn-morado'); 
    
    const STORAGE_KEY = 'misConciertosData';
    const VENTAS_KEY = 'registroVentas';

    const conciertosOriginales = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    window.comprarBoleto = (index) => {
        const concierto = conciertosOriginales[index];
        
        const nuevaVenta = {
            nombreEvento: concierto.nombre,
            precio: concierto.precio || 0,
            fecha: new Date().toLocaleString(),
            idVenta: "REF-" + Math.floor(Math.random() * 1000000)
        };

        const historial = JSON.parse(localStorage.getItem(VENTAS_KEY)) || [];
        historial.push(nuevaVenta);
        localStorage.setItem(VENTAS_KEY, JSON.stringify(historial));

        alert(`💰 ¡Venta procesada!\nEvento: ${concierto.nombre}\nTotal: Q${nuevaVenta.precio}`);
    };

    function renderizar(lista) {
        contenedor.innerHTML = '';

        if (lista.length === 0) {
            contenedor.innerHTML = `<h2 style="color:white; text-align:center; width:100%; grid-column: 1/-1; padding: 50px;">
                No hay coincidencias, Knight 🔍
            </h2>`;
            return;
        }

        lista.forEach((evento) => {
           
            const indiceReal = conciertosOriginales.indexOf(evento);
            
            const card = document.createElement('div');
            card.className = 'card-concierto';
            
            card.innerHTML = `
                <div class="card-imagen">
                    <img src="${evento.imagen || 'https://via.placeholder.com/400x250'}" alt="${evento.nombre}" style="width:100%;">
                </div>
                <div class="card-info" style="padding: 15px; text-align: center;">
                    <h3 style="color: #ff8c00; margin-bottom: 5px;">${evento.nombre}</h3>
                    <p style="color: #888; font-size: 0.7rem; margin-bottom: 10px; text-transform: uppercase;">
                        ${evento.categoria || 'General'}
                    </p>
                    
                    <button class="btn-comprar" 
                            onclick="comprarBoleto(${indiceReal})" 
                            style="background: black; color: #ff8c00; border: 1px solid #ff8c00; padding: 10px; cursor: pointer; font-weight: bold; width: 100%; border-radius: 4px;">
                        Comprar Q${evento.precio || 0}
                    </button>

                    <a href="html/detalle.html?id=${indiceReal}" style="display:block; margin-top:10px; color:white; font-size: 0.7rem; text-decoration: none; opacity: 0.6;">
                        Más información
                    </a>
                </div>
            `;
            contenedor.appendChild(card);
        });
    }

    
    const ejecutarFiltros = () => {
        const termino = inputBusqueda.value.toLowerCase().trim();
        
        const filtrados = conciertosOriginales.filter(c => 
            c.nombre.toLowerCase().includes(termino) || 
            (c.categoria && c.categoria.toLowerCase().includes(termino))
        );
        
        renderizar(filtrados);
    };

   
    inputBusqueda.addEventListener('input', ejecutarFiltros);

    if(btnFiltroMorado) {
        btnFiltroMorado.addEventListener('click', (e) => {
            e.preventDefault();
            ejecutarFiltros();
        });
    }

  
    renderizar(conciertosOriginales);
});