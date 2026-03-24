document.addEventListener('DOMContentLoaded', () => {
    console.log("¡Caballerito, el sistema de guardado está listo!");

    const btnGuardar = document.getElementById('btn-guardar-evento');
    const btnAddHorario = document.getElementById('add-horario');
    const listaHorarios = document.getElementById('lista-horarios');

    if (btnAddHorario) {
        btnAddHorario.onclick = (e) => {
            e.preventDefault();
            const nuevo = document.createElement('div');
            nuevo.className = 'item-horario';
            nuevo.innerHTML = `
                <input type="text" class="clase-fecha" placeholder="fecha">
                <input type="text" class="clase-lugar" placeholder="lugar">
            `;
            listaHorarios.appendChild(nuevo);
        };
    }

    if (btnGuardar) {
        btnGuardar.onclick = () => {
            const nombre = document.getElementById('nombre-concierto').value;
            const imagen = document.getElementById('url-imagen').value;
            const desc = document.getElementById('descripcion-evento').value;

            if (!nombre) {
                alert("¡Knight, el concierto debe tener un nombre!");
                return;
            }

            const cuadros = document.querySelectorAll('.item-horario');
            const horariosArray = [];

            cuadros.forEach(cuadro => {
                const inputFecha = cuadro.querySelector('.clase-fecha');
                const inputLugar = cuadro.querySelector('.clase-lugar');
                
                if (inputFecha && inputLugar) {
                    const f = inputFecha.value;
                    const l = inputLugar.value;
                    if (f || l) {
                        horariosArray.push({ fecha: f, lugar: l });
                    }
                }
            });

            const nuevoEvento = {
                id: Date.now(), 
                nombre: nombre,
                imagen: imagen || "https://via.placeholder.com/300",
                descripcion: desc,
                horarios: horariosArray
            };

            let db = JSON.parse(localStorage.getItem('misConciertosData')) || [];
            db.push(nuevoEvento);
            localStorage.setItem('misConciertosData', JSON.stringify(db));

            console.log("Evento guardado:", nuevoEvento);

        alert("✅ ¡Cambios guardados! Redirigiendo al inventario...");

        window.location.href = "invaneventos.html";
        };
    } else {
        console.error("No se encontró el botón con ID: btn-guardar-evento");
    }
});