document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formulario-evento');
    const selectCategoria = document.getElementById('evento-categoria');

    const categoriasBase = JSON.parse(localStorage.getItem('misCategoriasData')) || [];
    categoriasBase.forEach(cat => {
        const op = document.createElement('option');
        op.value = cat.nombre;
        op.textContent = cat.nombre;
        selectCategoria.appendChild(op);
    });

    if (formulario) {
        formulario.addEventListener('submit', (e) => {
            e.preventDefault();

           
            const nombre = document.getElementById('evento-nombre').value.trim();
            const categoria = selectCategoria.value;
            const precio = document.getElementById('evento-precio').value;
            const hora = document.getElementById('evento-hora').value; 
            const imagen = document.getElementById('evento-imagen').value.trim();
            const desc = document.getElementById('evento-descripcion').value.trim();

            const conciertoNuevo = {
                nombre: nombre,
                categoria: categoria,
                precio: parseFloat(precio) || 0,
                hora: hora, 
                imagen: imagen,
                descripcion: desc,
                horarios: [] 
            };

            try {
                let baseDeDatos = JSON.parse(localStorage.getItem('misConciertosData')) || [];
                baseDeDatos.push(conciertoNuevo);
                localStorage.setItem('misConciertosData', JSON.stringify(baseDeDatos));

                alert("✅ ¡Concierto y horario guardados, Knight!");
                formulario.reset();
            } catch (error) {
                console.error("Error al guardar:", error);
                alert("Error al guardar. Revisa la consola.");
            }
        });
    }
});