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

// --- Galería ---
// --- Código de la galería ---
fetch("../js/galeria.json")
  .then(response => response.json())
  .then(data => {
    const contenedor = document.getElementById("contenedor-galeria");
    if (!contenedor) return; // <-- evita errores en el index
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

// --- Cálculo de presupuesto ---
document.addEventListener("DOMContentLoaded", () => {
  const productoSelect = document.getElementById("producto");
  const plazoInput = document.getElementById("plazo");
  const extrasCheckboxes = document.querySelectorAll("input[name='extras']");
  const totalInput = document.getElementById("presupuesto");

  function calcularPresupuesto() {
    let total = 0;

    // Precio base del producto seleccionado
    const producto = productoSelect.selectedOptions[0];
    if (producto && producto.dataset.precio) {
      total += parseFloat(producto.dataset.precio);
    }

    // Extras seleccionados
    extrasCheckboxes.forEach(chk => {
      if (chk.checked) {
        total += parseFloat(chk.value);
      }
    });

    // Descuento por plazo corto (<=7 días)
    const plazo = parseInt(plazoInput.value);
    if (plazo <= 7) {
      total *= 0.9; // 10% descuento
    }

    // Mostrar resultado
    totalInput.value = total.toFixed(2) + " €";
  }

  // Detectar cambios en cualquier campo
  productoSelect.addEventListener("change", calcularPresupuesto);
  plazoInput.addEventListener("input", calcularPresupuesto);
  extrasCheckboxes.forEach(chk => chk.addEventListener("change", calcularPresupuesto));

  // Calcular al cargar
  calcularPresupuesto();
});


