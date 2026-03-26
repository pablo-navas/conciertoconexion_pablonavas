document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('ciudad-nombre');
    const btnGuardar = document.getElementById('btn-guardar-ciudad');
    const lista = document.getElementById('lista-ciudades');
    
    // La llave que configuramos en evento.js
    const STORAGE_CIUDADES = 'misCiudadesData';

    // Cargar datos iniciales
    let ciudades = JSON.parse(localStorage.getItem(STORAGE_CIUDADES)) || [];

    function mostrarCiudades() {
        lista.innerHTML = '';
        ciudades.forEach((ciudad, index) => {
            const li = document.createElement('li');
            li.style.background = "#333";
            li.style.margin = "10px 0";
            li.style.padding = "10px";
            li.style.display = "flex";
            li.style.justifyContent = "space-between";
            li.style.borderLeft = "4px solid #ff8c00";

            li.innerHTML = `
                <span>${ciudad}</span>
                <button onclick="borrarCiudad(${index})" style="background:red; color:white; border:none; cursor:pointer; padding: 2px 8px;">X</button>
            `;
            lista.appendChild(li);
        });
    }

    btnGuardar.addEventListener('click', () => {
        const valor = input.value.trim();
        if (valor) {
            ciudades.push(valor);
            localStorage.setItem(STORAGE_CIUDADES, JSON.stringify(ciudades));
            input.value = '';
            mostrarCiudades();
        }
    });

    window.borrarCiudad = (index) => {
        ciudades.splice(index, 1);
        localStorage.setItem(STORAGE_CIUDADES, JSON.stringify(ciudades));
        mostrarCiudades();
    };

    mostrarCiudades();
});