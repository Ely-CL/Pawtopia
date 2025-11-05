// --- Galería ---
// --- Código de la galería ---
fetch("../js/galeria.json")
  .then(response => response.json())
  .then(data => {
    const contenedor = document.getElementById("contenedor-galeria");
    if (!contenedor) return; 
    data.imagenes.forEach(img => {
      const div = document.createElement("div");
      div.classList.add("galeria-item");
      div.innerHTML = `
        <img src="${img.src}" alt="${img.alt}">
        <p>${img.titulo}</p>
      `;
      div.addEventListener("click", () => mostrarLightbox(img));
      contenedor.appendChild(div);
    });
  });

function mostrarLightbox(imagen) {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;
  document.getElementById("imagen-ampliada").src = imagen.src;
  document.getElementById("titulo-imagen").textContent = imagen.titulo;
  lightbox.style.display = "flex";
}

document.getElementById("cerrar")?.addEventListener("click", () => {
  document.getElementById("lightbox").style.display = "none";
});