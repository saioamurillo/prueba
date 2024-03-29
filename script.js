var canvas = document.getElementById('gradient');
var ctx = canvas.getContext('2d');
canvas.width = 256;
canvas.height = 256;
var gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
gradient.addColorStop(0, 'white'); 
gradient.addColorStop(1, 'green'); 
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, canvas.width, canvas.height);

AFRAME.registerComponent('details-listener', {
    init: function () {
        var el = this.el; 
        console.log("init");

navigator.mediaDevices.getUserMedia({ audio: true })
    .then(function (stream) {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = "es-ES";
        const inputNode = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 2048;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        inputNode.connect(analyser);
        recognition.onstart = function () {
            console.log("El reconocimiento de voz ha comenzado");
        };
        recognition.onend = function () {
            console.log("El reconocimiento de voz ha terminado. Reiniciando...");
            recognition.start();
        };
        recognition.onresult = function (event) {
            const transcript = event.results[0][0].transcript;
            console.log("Texto reconocido:", transcript);
            const textoNormalizado = transcript
                .toLowerCase()
                .replace(/[^\w\s]/gi, "");
            if (textoNormalizado.includes("ver detalles covid")) {
                console.log("Te he escuchado");
                
                const token =
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6WyJhZG1pbiIsIkN1c3RvbU9iamVjdENhbkJlQWRkZWRIZXJlIl0sIm5iZiI6MTcxMTM1OTk4NiwiZXhwIjoxNzExOTY0Nzg2LCJpYXQiOjE3MTEzNTk5ODZ9.7DL7B5eudtcZANhgXVexHDOqE4yzj1ijozpbkVXfyqc";
                const headers = {
                    Authorization: `Bearer ${token}`,
                };
                fetch("https://207.180.229.60:9443/v1/api/CAJAS/7063", {
                    method: "GET",
                    headers: headers,
                })
                    .then((res) => res.json())
                    .then((res) => {
                        console.log(res);
                        visualizacion(res);                      
                    })
                    .catch((error) => console.error(error));
                    
                } else if (textoNormalizado.includes("ver detalles adn")) {
                    console.log("Te he escuchado");
                
                    const token =
                        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6WyJhZG1pbiIsIkN1c3RvbU9iamVjdENhbkJlQWRkZWRIZXJlIl0sIm5iZiI6MTcxMTM1OTk4NiwiZXhwIjoxNzExOTY0Nzg2LCJpYXQiOjE3MTEzNTk5ODZ9.7DL7B5eudtcZANhgXVexHDOqE4yzj1ijozpbkVXfyqc";
                    const headers = {
                        Authorization: `Bearer ${token}`,
                    };
                    fetch("https://207.180.229.60:9443/v1/api/CAJAS/7063", {
                        method: "GET",
                        headers: headers,
                    })
                        .then((res) => res.json())
                        .then((res) => {
                            console.log(res);
                            visualizacionADN('adn-marker', res);                      
                        })
                        .catch((error) => console.error(error));
                
                
                }else if (textoNormalizado.includes("ocultar detalles covid")) {
                    console.log("Ocultar detalles Covid");
                
                    var circleToRemove = document.getElementById('new-circle-covid');
                    if (circleToRemove) {
                        circleToRemove.parentNode.removeChild(circleToRemove);
                    }
                }else if (textoNormalizado.includes("ocultar detalles adn")) {
                    console.log("Ocultar detalles ADN");
                
                    var circleToRemove = document.getElementById('new-circle-adn');
                    if (circleToRemove) {
                        circleToRemove.parentNode.removeChild(circleToRemove);
                    }
                    
        }

        };

        recognition.onerror = function (event) {
            console.error("Error de reconocimiento de voz:", event.error);
        };

        function visualize() {
            analyser.getByteTimeDomainData(dataArray);
            requestAnimationFrame(visualize);
        }
        visualize();
        recognition.start();


    })
    
    .catch(function (err) {
        console.error("Error al obtener el flujo de audio:", err);
    });

    function visualizacion(objeto) {

        var newCircle = document.createElement('a-circle');
        newCircle.setAttribute('id', 'new-circle-covid'); 
        newCircle.setAttribute('radius', '0.25');
        newCircle.setAttribute('color', 'white');
        newCircle.setAttribute('position', '0 -1.2 0'); 
        newCircle.setAttribute('rotation', '0 45 0');
        newCircle.setAttribute('animation', 'property: rotation; to: 0 360 0; dur: 1000; easing: linear');
        newCircle.setAttribute('material', 'shader: flat; src: #gradient'); 

        var newText = document.createElement('a-text');
        newText.setAttribute('value',`Code:${objeto.code}\n${objeto.message}\n${objeto.document.CAJA_ID}`); 
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
    }
    function visualizacionADN(markerId, objeto) {
        const marker = document.getElementById(markerId);
        if (!marker) return;

        var newCircle = document.createElement('a-circle');
        newCircle.setAttribute('id', 'new-circle-adn'); 
        newCircle.setAttribute('radius', '0.25');
        newCircle.setAttribute('color', 'violet');
        newCircle.setAttribute('position', '0 0 1'); 
        newCircle.setAttribute('rotation', '-90 0 0');
        newCircle.setAttribute('animation', 'property: rotation; to:  270 0 0; dur: 1000; easing: linear');

        var newText = document.createElement('a-text');
        newText.setAttribute('value',`Code:${objeto.code}\n${objeto.message}\n${objeto.document.CAJA_ID}`); 
        newText.setAttribute('align', 'center');
        newText.setAttribute('position', '0 0 0.05');
        newText.setAttribute('color', 'black');
        newText.setAttribute('scale', '0.3 0.3 0.3'); 
        newCircle.appendChild(newText);

        const radius = 0.35;
        const numSpheres = 8;
        const angleIncrement = (2 * Math.PI) / numSpheres;
        for (let i = 0; i < numSpheres; i++) {
            const angle = i * angleIncrement;
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);
            const sphere = document.createElement('a-sphere');
            sphere.setAttribute('radius', '0.05');
            sphere.setAttribute('color', 'purple');
            sphere.setAttribute('position', `${x} ${y} 0`);
            sphere.setAttribute('animation', 'property: rotation; to: 0 360 0; dur: 2000; easing: linear; loop: true');
            newCircle.appendChild(sphere);
        }
        marker.appendChild(newCircle);
    }
}
    
})

document.addEventListener('DOMContentLoaded', function () {
    var detailsBox = document.querySelector('#details-box');
    if (detailsBox) {
        console.log("existe")
        detailsBox.setAttribute('details-listener', '');
    }
});
    

    
    

