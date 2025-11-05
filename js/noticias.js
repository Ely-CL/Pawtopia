// --- Noticias ---
fetch("./js/noticias.json")
  .then(response => response.json())
  .then(data => {
    const contenedor = document.getElementById('lista-noticias');
    if (!contenedor) return;
    data.forEach(noticia => {
      const articulo = document.createElement('article');
      articulo.innerHTML = `
        <h3>${noticia.titulo}</h3>
        <p><strong>Fecha:</strong> ${noticia.fecha}</p>
        <p>${noticia.descripcion}</p>
      `;
      contenedor.appendChild(articulo);
    });
  });