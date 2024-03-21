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
        el.addEventListener('click', function (evt) {
            console.log("Clic detectado en Ver Detalles."); 
            var newCircle = document.createElement('a-circle');
            newCircle.setAttribute('radius', '0.25');
            newCircle.setAttribute('color', 'white');
            newCircle.setAttribute('position', '1 0 1'); 
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
                sphere.setAttribute('animation', 'property: rotation; to: 0 360 0; dur: 2000; easing: linear; loop: true'); // Animación de rotación constante
                newCircle.appendChild(sphere);
            }

            el.parentNode.appendChild(newCircle); 
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    var detailsBox = document.querySelector('#details-box');
    if (detailsBox) {
        detailsBox.setAttribute('details-listener', '');
    }
});


