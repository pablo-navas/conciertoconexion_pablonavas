document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formulario-evento');
    const selectCategoria = document.getElementById('evento-categoria');

    // --- 1. CARGAR CATEGORÍAS (Para que el select no esté vacío) ---
    const categoriasGuardadas = JSON.parse(localStorage.getItem('misCategoriasData')) || [];
    console.log("Categorías encontradas:", categoriasGuardadas);

    categoriasGuardadas.forEach(cat => {
        const opcion = document.createElement('option');
        opcion.value = cat.nombre;
        opcion.textContent = cat.nombre;
        selectCategoria.appendChild(opcion);
    });

    // --- 2. LOGICA DE GUARDADO ---
    if (formulario) {
        formulario.addEventListener('submit', (e) => {
            e.preventDefault(); // ¡Vital! Detiene el refresco de página
            console.log("Intentando guardar...");

            // Capturamos los valores
            const nombre = document.getElementById('evento-nombre').value.trim();
            const categoria = selectCategoria.value;
            const imagen = document.getElementById('evento-imagen').value.trim();
            const descripcion = document.getElementById('evento-descripcion').value.trim();

            // Validación simple
            if (!nombre || !categoria || !imagen) {
                alert("Por favor, llena los campos obligatorios (Nombre, Categoría e Imagen)");
                return;
            }

            // Creamos el objeto del concierto
            const nuevoConcierto = {
                nombre: nombre,
                categoria: categoria,
                imagen: imagen,
                descripcion: descripcion,
                horarios: [] 
            };

            try {
                // Traemos lo que ya existe
                let inventario = JSON.parse(localStorage.getItem('misConciertosData')) || [];
                
                // Agregamos el nuevo
                inventario.push(nuevoConcierto);
                
                // Guardamos de vuelta
                localStorage.setItem('misConciertosData', JSON.stringify(inventario));
                
                console.log("¡Guardado con éxito!", nuevoConcierto);
                alert("✅ Concierto guardado correctamente");
                
                // Limpiamos el formulario
                formulario.reset();
                
                // Opcional: Redirigir al inventario para ver que sí se guardó
                // window.location.href = "inaneventos.html";

            } catch (error) {
                console.error("Error al guardar en LocalStorage:", error);
                alert("Hubo un error al guardar. Revisa la consola.");
            }
        });
    } else {
        console.error("No se encontró el formulario con ID 'formulario-evento'");
    }
});