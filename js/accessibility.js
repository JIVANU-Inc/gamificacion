let daltonicButton = document.getElementById("daltonicButton");

daltonicButton.addEventListener("click", function () {
    if (daltonicButton.value == "0") {
        daltonicButton.value = "1";
        daltonicButton.innerHTML =
            "<i class='bi bi-sunglasses'></i> (Encendido)";
    } else {
        daltonicButton.value = "0";
        daltonicButton.innerHTML = '<i class="bi bi-eyeglasses"></i> (Apagado)';
    }
});
