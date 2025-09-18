// Función genérica para manejar productos
function manejarProducto(num) {
  const btnSelect = document.getElementById(`btnSelect${num}`);
  const btnRemove = document.getElementById(`btnRemove${num}`);
  const card = document.getElementById(`producto${num}`);
  const texto = document.getElementById(`texto${num}`);

  btnSelect.addEventListener("click", function() {
    card.classList.add("border", "border-success", "shadow");
    texto.textContent = "✅ Producto seleccionado";
    texto.classList.remove("d-none");
  });

  btnRemove.addEventListener("click", function() {
    card.classList.remove("border", "border-success", "shadow");
    texto.classList.add("d-none");
  });
}

// Activamos la función para cada producto existente
manejarProducto(1);
manejarProducto(2);
manejarProducto(3);

// Cambiar color de fondo desde el input
document.getElementById("colorFondo").addEventListener("input", function(e) {
  document.body.style.backgroundColor = e.target.value;
});

// Agregar nuevas imágenes a la galería
document.getElementById("btnAgregar").addEventListener("click", function() {
  const urlImagen = document.getElementById("inputImagen").value;
  const galeria = document.getElementById("galeria");

  if (urlImagen.trim() !== "") {
    // Crear columna
    const col = document.createElement("div");
    col.classList.add("col-md-4");

    // Crear card
    const card = document.createElement("div");
    card.classList.add("card", "h-100");
    const cardId = `producto${document.querySelectorAll("#galeria .card").length + 1}`;
    card.id = cardId;

    // Crear imagen
    const img = document.createElement("img");
    img.src = urlImagen;
    img.classList.add("card-img-top");
    img.alt = "Imagen agregada";

    // Crear card body con botones y texto
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const titulo = document.createElement("h5");
    titulo.classList.add("card-title");
    titulo.textContent = `Producto ${document.querySelectorAll("#galeria .card").length + 1}`;

    const texto = document.createElement("p");
    texto.classList.add("card-text", "d-none");
    texto.id = `texto${document.querySelectorAll("#galeria .card").length + 1}`;
    texto.textContent = "Precio: $0";

    const btnSelect = document.createElement("button");
    btnSelect.classList.add("btn", "btn-primary", "me-2");
    btnSelect.id = `btnSelect${document.querySelectorAll("#galeria .card").length + 1}`;
    btnSelect.textContent = "Seleccionar";

    const btnRemove = document.createElement("button");
    btnRemove.classList.add("btn", "btn-danger");
    btnRemove.id = `btnRemove${document.querySelectorAll("#galeria .card").length + 1}`;
    btnRemove.textContent = "Quitar";

    cardBody.appendChild(titulo);
    cardBody.appendChild(texto);
    cardBody.appendChild(btnSelect);
    cardBody.appendChild(btnRemove);
    card.appendChild(img);
    card.appendChild(cardBody);
    col.appendChild(card);
    galeria.appendChild(col);

    // Activar función para el nuevo producto
    manejarProducto(document.querySelectorAll("#galeria .card").length);

    // Limpiar input
    document.getElementById("inputImagen").value = "";
  } else {
    alert("Por favor ingresa una URL válida.");
  }
});

// ===== Degradado HSL con mousemove (fluido con rAF) =====
(function () {
  const target = document.body; // puedes cambiar a .container si quieres
  let rafId = null;
  let mouseX = 0, mouseY = 0;

  // Mapea un valor de un rango a otro
  const map = (v, inMin, inMax, outMin, outMax) =>
    outMin + ((v - inMin) * (outMax - outMin)) / (inMax - inMin);

  function updateGradient() {
    rafId = null;

    const w = window.innerWidth || 1;
    const h = window.innerHeight || 1;

    // H: 0–360 a partir de X; L: 40–70% a partir de Y
    const hue1 = Math.round(map(mouseX, 0, w, 0, 360));
    const hue2 = (hue1 + 120) % 360; // segunda tonalidad desplazada
    const light = Math.round(map(mouseY, 0, h, 40, 70));

    // Saturación fija alta para un color vibrante
    const sat = 85;

    // Gradiente lineal
    const css = `linear-gradient(135deg,
      hsl(${hue1} ${sat}% ${light}%),
      hsl(${hue2} ${sat}% ${light}%)
    )`;

    target.style.background = css;
  }

  function onMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (rafId === null) {
      rafId = requestAnimationFrame(updateGradient);
    }
  }

  window.addEventListener('mousemove', onMove, { passive: true });

  // Primer render centrado
  mouseX = window.innerWidth / 2;
  mouseY = window.innerHeight / 2;
  updateGradient();
})();