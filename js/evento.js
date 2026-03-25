document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formulario-evento');
    const selectCategoria = document.getElementById('evento-categoria');
    const selectCiudad = document.getElementById('evento-ciudad'); 
    const btnGuardar = document.getElementById('btn-guardar-evento');

    const urlParams = new URLSearchParams(window.location.search);
    const editId = urlParams.get('editId'); 

    const STORAGE_KEY = 'misConciertosData';
    let conciertos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    const cats = JSON.parse(localStorage.getItem('misCategoriasData')) || [];
    selectCategoria.innerHTML = '<option value="">Selecciona...</option>';
    cats.forEach(c => {
        const o = document.createElement('option');
        o.value = c.nombre;
        o.textContent = c.nombre;
        selectCategoria.appendChild(o);
    });

    if (editId !== null && conciertos[editId]) {
        console.log("Cargando datos para editar...", conciertos[editId]);
        const datos = conciertos[editId];

        document.getElementById('evento-nombre').value = datos.nombre || "";
        document.getElementById('evento-precio').value = datos.precio || 0;
        document.getElementById('evento-hora').value = datos.hora || "";
        document.getElementById('evento-imagen').value = datos.imagen || "";
        document.getElementById('evento-descripcion').value = datos.descripcion || "";

        if(selectCiudad) {
            selectCiudad.value = datos.ciudad || "";
        }

        setTimeout(() => {
            selectCategoria.value = datos.categoria;
        }, 50);

        if(btnGuardar) {
            btnGuardar.textContent = "🚀 ACTUALIZAR DATOS";
            btnGuardar.style.background = "#4CAF50"; 
        }
    }

    formulario.addEventListener('submit', (e) => {
        e.preventDefault();

        const nuevoObjeto = {
            nombre: document.getElementById('evento-nombre').value,
            categoria: selectCategoria.value,
            ciudad: selectCiudad ? selectCiudad.value : "Capital", 
            precio: parseFloat(document.getElementById('evento-precio').value),
            hora: document.getElementById('evento-hora').value,
            imagen: document.getElementById('evento-imagen').value,
            descripcion: document.getElementById('evento-descripcion').value,
            horarios: [] 
        };

        if (editId !== null) {
            nuevoObjeto.horarios = conciertos[editId].horarios || [];
            conciertos[editId] = nuevoObjeto; 
            alert("¡Cambios guardados con éxito!");
        } else {
            conciertos.push(nuevoObjeto); 
            alert("¡Nuevo evento creado!");
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(conciertos));
        window.location.href = "invaneventos.html";
    });
});