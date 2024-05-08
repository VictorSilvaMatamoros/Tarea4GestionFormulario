
//con esto nos aseguramos que el html este completamente cargado antes de hacer nada en el 

document.addEventListener('DOMContentLoaded', function () {
    // Obtenemos los elementos del formulario
    const nombreEntrada = document.getElementById('nombre');
    const numeroEntrada = document.getElementById('numero');
    const fechaEntrada = document.getElementById('fecha');
    const cvvEntrada = document.getElementById('cvv');
    const botonEnviar = document.querySelector('input[type="submit"]');

    // con regex validamos los nombres y fechas y cvvs
    const patronNombre = /^(MasterCard|Visa|American Express)$/i;
    const patronFecha = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const patronCvv = /^[0-9]{3}$/;

    // lo mismo para cada tipo de tarjeta
    const patronMastercard = /^5[1-5][0-9]{14}$/;
    const patronVisa = /^4[0-9]{12}(?:[0-9]{3})?$/;
    const patronAmex = /^3[47][0-9]{13}$/;

    // Opciones válidas para el campo de nombre
    const opcionesValidas = ["mastercard", "visa", "american express"];

    // Función para validar una entrada con un patrón dado
    function validarEntrada(entrada, patron) {
        const valorEntrada = entrada.value.replace(/\s/g, ''); // Eliminar espacios en blanco
        if (patron.test(valorEntrada)) {
            entrada.style.border = '1px solid green'; // Establecer borde verde si es válido
            return true;
        } else {
            entrada.style.border = '1px solid red'; // Establecer borde rojo si no es válido
            return false;
        }
    }

    // Función para validar todo el formulario y habilitar o deshabilitar el botón de enviar
    function validarFormulario() {
        const esNombreValido = validarEntrada(nombreEntrada, patronNombre);
        let esNumeroValido = false;

        if (esNombreValido) {
            const valorNombre = nombreEntrada.value.toLowerCase();
            // Validar el número de tarjeta según el tipo seleccionado
            if (valorNombre === "mastercard") {
                esNumeroValido = validarEntrada(numeroEntrada, patronMastercard);
            } else if (valorNombre === "visa") {
                esNumeroValido = validarEntrada(numeroEntrada, patronVisa);
            } else if (valorNombre === "american express") {
                esNumeroValido = validarEntrada(numeroEntrada, patronAmex);
            }
        }

        // Validar el resto de campos
        const esFechaValida = validarEntrada(fechaEntrada, patronFecha);
        const esCvvValido = validarEntrada(cvvEntrada, patronCvv);

        // Habilitar o deshabilitar el botón de enviar según la validez del formulario
        if (esNombreValido && esNumeroValido && esFechaValida && esCvvValido) {
            botonEnviar.disabled = false; // Habilitar el botón si el formulario es válido
        } else {
            botonEnviar.disabled = true; // Deshabilitar el botón si el formulario no es válido
        }
    }

    // Agregar eventos de entrada a todos los campos del formulario
    nombreEntrada.addEventListener('input', validarFormulario);
    numeroEntrada.addEventListener('input', validarFormulario);
    fechaEntrada.addEventListener('input', validarFormulario);
    cvvEntrada.addEventListener('input', validarFormulario);

    // Verificar si el valor del nombre coincide con las opciones permitidas
    nombreEntrada.addEventListener('input', function () {
        const valorNombre = nombreEntrada.value.toLowerCase();
        if (!opcionesValidas.includes(valorNombre)) {
            // Si el valor del nombre no coincide con las opciones permitidas, mostrar un borde rojo
            nombreEntrada.style.border = '1px solid red';
        }
    });
});
