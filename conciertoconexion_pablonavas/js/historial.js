document.addEventListener('DOMContentLoaded', () => {
    const contenedor = document.getElementById('lista-mis-boletos');
    
    // Leemos los boletos que el usuario ha comprado
    const misBoletos = JSON.parse(localStorage.getItem('misBoletosComprados')) || [];

    if (misBoletos.length === 0) {
        contenedor.innerHTML = `<p style="text-align:center; color:#7a7a7a; margin-top:50px;">
            Aún no has comprado ningún boleto. ¡Ve por el tuyo!
        </p>`;
        return;
    }

    misBoletos.forEach(boleto => {
        const div = document.createElement('div');
        div.className = 'boleto-item';
        
        div.innerHTML = `
            <div class="foto-boleto">
                <img src="${boleto.imagen}" alt="evento">
            </div>
            <div class="info-boleto">
                <h2>${boleto.nombre}</h2>
                <p><strong>Fecha:</strong> ${boleto.fecha} | <strong>Ciudad:</strong> ${boleto.ciudad}</p>
                <p><strong>Código de Entrada:</strong> #${Math.floor(Math.random() * 1000000)}</p>
            </div>
        `;
        contenedor.appendChild(div);
    });
});