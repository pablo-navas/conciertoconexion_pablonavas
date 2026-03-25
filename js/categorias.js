document.addEventListener('DOMContentLoaded', () => {
    const btnGuardar = document.getElementById('btn-guardar-cat');
    const inputNombre = document.getElementById('cat-nombre');
    const listaHtml = document.getElementById('lista-categorias');

    const STORAGE_CAT = 'misCategoriasData';

    function cargarCategorias() {
        const categorias = JSON.parse(localStorage.getItem(STORAGE_CAT)) || [];
        listaHtml.innerHTML = '';

        if (categorias.length === 0) {
            listaHtml.innerHTML = '<li style="color: gray;">No hay categorías aún.</li>';
            return;
        }

        categorias.forEach((cat, index) => {
            const li = document.createElement('li');
            li.style.cssText = "padding:10px; border-bottom:1px solid #ff8c00; display:flex; justify-content:space-between;";
            li.innerHTML = `
                <span>${cat.nombre}</span>
                <button onclick="borrarCategoria(${index})" style="background: red; color: white; border: none; padding: 5px 10px; cursor: pointer;">Borrar</button>
            `;
            listaHtml.appendChild(li);
        });
    }

    btnGuardar.addEventListener('click', () => {
        const nombre = inputNombre.value.trim();
        if (!nombre) {
            alert("El nombre no puede estar vacío.");
            return;
        }

        const categorias = JSON.parse(localStorage.getItem(STORAGE_CAT)) || [];
        categorias.push({ nombre: nombre }); 
        
        localStorage.setItem(STORAGE_CAT, JSON.stringify(categorias));
        inputNombre.value = ''; 
        cargarCategorias(); 
    });

    window.borrarCategoria = (index) => {
        if (confirm("¿Borrar esta categoría?")) {
            const categorias = JSON.parse(localStorage.getItem(STORAGE_CAT)) || [];
            categorias.splice(index, 1);
            localStorage.setItem(STORAGE_CAT, JSON.stringify(categorias));
            cargarCategorias();
        }
    };

    cargarCategorias();
});