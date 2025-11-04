// Crear el mapa dentro del contenedor con id="map"
var mimapa = L.map('map').setView([43.5536399, -5.9283912], 14);

// Cargar los tiles (las imágenes del mapa) desde OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution:
    '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mimapa);

// Añadir el marcador del negocio
var negocio = L.marker([43.5536399, -5.9283912]).addTo(mimapa);
negocio.bindPopup("<b>Pawtopia</b><br>C/ Severo Ochoa, nº15<br>Avilés, Asturias").openPopup();

// Intentar localizar al usuario
mimapa.locate({ setView: true, maxZoom: 15 });

// Si se encuentra la ubicación
mimapa.on('locationfound', function (e) {
  L.marker(e.latlng)
    .addTo(mimapa)
    .bindPopup("Estás aquí").openPopup();

  // Trazar la ruta desde el usuario hasta el negocio
  L.Routing.control({
    waypoints: [
      e.latlng, // posición del usuario
      L.latLng(43.5536399, -5.9283912) // posición del negocio
    ],
    routeWhileDragging: true,
    language: 'es'
  }).addTo(mimapa);
});

// Si no se puede localizar al usuario
mimapa.on('locationerror', function () {
  alert("No se pudo obtener tu ubicación. Activa el GPS o permisos de ubicación.");

  // Mostrar solo el marcador del negocio
  mimapa.setView([43.5536399, -5.9283912], 15);
});
