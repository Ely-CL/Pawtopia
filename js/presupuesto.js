// --- Cálculo de presupuesto ---
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("myForm");
    const productoSelect = document.getElementById("producto");
    const plazoInput = document.getElementById("plazo");
    const extrasCheckboxes = document.querySelectorAll("input[name='extras']");
    const totalInput = document.getElementById("presupuesto");

    const firstName = document.getElementById("first-name");
    const lastName = document.getElementById("last-name");
    const email = document.getElementById("email");
    const telefono = document.getElementById("telefono");
    const politica = document.getElementById("politica");

    const errorFields = {
        "first-name": document.getElementById("error-first-name"),
        "last-name": document.getElementById("error-last-name"),
        "email": document.getElementById("error-email"),
        "telefono": document.getElementById("error-telefono"),
        "producto": document.getElementById("error-producto"),
        "plazo": document.getElementById("error-plazo"),
        "politica": document.getElementById("error-politica")
    };

    function calcularPresupuesto() {
        let total = 0;

        const producto = productoSelect.selectedOptions[0];
        if (producto && producto.dataset.precio) {
            total += parseFloat(producto.dataset.precio);
        }

        extrasCheckboxes.forEach(chk => {
            if (chk.checked) total += parseFloat(chk.value);
        });

        const plazo = parseInt(plazoInput.value);
        if (!isNaN(plazo) && plazo <= 7) {
            total *= 0.9; // 10% descuento
        }

        totalInput.value = total.toFixed(2) + " €";
    }

    function validarCampo() {
        let valido = true;

        if (!/^[A-Za-z]{3,15}$/.test(firstName.value)) {
            errorFields["first-name"].textContent = "Nombre entre 3 y 15 letras";
            valido = false;
        } else {
            errorFields["first-name"].textContent = "";
        }

        if (!/^[A-Za-z]{3,40}$/.test(lastName.value)) {
            errorFields["last-name"].textContent = "Apellido entre 3 y 40 letras";
            valido = false;
        } else {
            errorFields["last-name"].textContent = "";
        }

        if (!/^[\w.-]+@[\w.-]+\.[a-z]{2,4}$/i.test(email.value)) {
            errorFields["email"].textContent = "Correo inválido";
            valido = false;
        } else {
            errorFields["email"].textContent = "";
        }

        if (!/^\d{9}$/.test(telefono.value)) {
            errorFields["telefono"].textContent = "Teléfono de 9 números";
            valido = false;
        } else {
            errorFields["telefono"].textContent = "";
        }

        if (!productoSelect.value) {
            errorFields["producto"].textContent = "Seleccione un producto";
            valido = false;
        } else {
            errorFields["producto"].textContent = "";
        }

        if (!plazoInput.value || plazoInput.value < 1 || plazoInput.value > 30) {
            errorFields["plazo"].textContent = "Plazo entre 1 y 30 días";
            valido = false;
        } else {
            errorFields["plazo"].textContent = "";
        }

        if (!politica.checked) {
            errorFields["politica"].textContent = "Debe aceptar la política";
            valido = false;
        } else {
            errorFields["politica"].textContent = "";
        }

        return valido;
    }

    // Eventos
    productoSelect.addEventListener("change", calcularPresupuesto);
    plazoInput.addEventListener("input", calcularPresupuesto);
    extrasCheckboxes.forEach(chk => chk.addEventListener("change", calcularPresupuesto));

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (validarCampo()) {
            alert("Formulario enviado correctamente");
            form.reset();
            calcularPresupuesto();
        } else {
            calcularPresupuesto();
        }
    });

    // Calcular presupuesto inicial
    calcularPresupuesto();
});


