var canvas = document.getElementById('gradient');
var ctx = canvas.getContext('2d');

// DEGRADADO
canvas.width = 256;
canvas.height = 256;

var gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
gradient.addColorStop(0, 'white'); 
gradient.addColorStop(1, 'green'); 

ctx.fillStyle = gradient;
ctx.fillRect(0, 0, canvas.width, canvas.height);

//CLIC Y ANIMACIONES

AFRAME.registerComponent('details-listener', {
    init: function () {
        var el = this.el; 
        var buttonClicked = false;
        var detailsButton = document.querySelector('#details-button');
        var planoAzul = document.querySelector('#details-box')


        el.addEventListener('click', function (evt) {
            if (!buttonClicked) { 
                console.log("Clic detectado en Ver Detalles."); 
                buttonClicked = true; 

                detailsButton.setAttribute('value', 'Ocultar detalles'); // Cambiar el texto a "Ocultar detalles"
               planoAzul.setAttribute("color", "gray")

                // Agregar el círculo y las esferas
                var newCircle = document.createElement('a-circle');
                newCircle.setAttribute('id', 'new-circle'); // Agregar un ID para identificarlo fácilmente
                newCircle.setAttribute('radius', '0.25');
                newCircle.setAttribute('color', 'white');
                newCircle.setAttribute('position', '0 -0.7 0'); 
                newCircle.setAttribute('rotation', '0 45 0');
                newCircle.setAttribute('animation', 'property: rotation; to: 0 360 0; dur: 1000; easing: linear');
                newCircle.setAttribute('material', 'shader: flat; src: #gradient'); 

                var newText = document.createElement('a-text');
                newText.setAttribute('value', 'Detalles');
                newText.setAttribute('align', 'center');
                newText.setAttribute('position', '0 0 0.05');
                newText.setAttribute('color', 'black');
                newText.setAttribute('scale', '0.3 0.3 0.3'); 
                newCircle.appendChild(newText);

                var radius = 0.35; 
                var numSpheres = 8; 
                var angleIncrement = (2 * Math.PI) / numSpheres; 
                for (var i = 0; i < numSpheres; i++) {
                    var angle = i * angleIncrement; 
                    var x = radius * Math.cos(angle); 
                    var y = radius * Math.sin(angle); 

                    var sphere = document.createElement('a-sphere');
                    sphere.setAttribute('radius', '0.05');
                    sphere.setAttribute('color', 'green');
                    sphere.setAttribute('position', x + ' ' + y + ' 0'); 
                    sphere.setAttribute('animation', 'property: rotation; to: 0 360 0; dur: 2000; easing: linear; loop: true'); 
                    newCircle.appendChild(sphere);
                }

                el.parentNode.appendChild(newCircle); 

            } else {
                console.log("Clic detectado en Ocultar Detalles.");
                buttonClicked = false;

                detailsButton.setAttribute('value', 'Ver detalles'); // Cambiar el texto a "Ver detalles"
                planoAzul.setAttribute("color", "green")
                
                // Eliminar el círculo y las esferas si existen
                var newCircle = document.querySelector('#new-circle');
                if (newCircle) {
                    newCircle.parentNode.removeChild(newCircle);
                }
            }
        });
    }
});


// Configurar el raycaster
document.addEventListener('DOMContentLoaded', function () {
    var sceneEl = document.querySelector('a-scene');
    sceneEl.addEventListener('loaded', function () {
        var raycasterEl = document.querySelector('[raycaster]');
        raycasterEl.setAttribute('raycaster', 'objects: .clickable');
    });
});

// Escucha cambios en la posición del objeto detectado (planoAzul)
var planoAzul = document.querySelector('#details-box');
planoAzul.addEventListener('componentchanged', function (evt) {
    if (evt.detail.name === 'position') {
        // Cuando la posición de planoAzul cambie, actualiza la posición del botón "Ver detalles"
        var newPosition = planoAzul.getAttribute('position');
        detailsButton.setAttribute('position', newPosition);
    }
});

// Agregar el componente 'details-listener'
document.addEventListener('DOMContentLoaded', function () {
    var detailsBox = document.querySelector('#details-box');
    if (detailsBox) {
        detailsBox.setAttribute('details-listener', '');
    }
});


