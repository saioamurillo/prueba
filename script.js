const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = "es-ES";
recognition.onstart = function () {
    console.log("El reconocimiento de voz ha comenzado");
};
recognition.onend = function () {
    console.log("El reconocimiento de voz ha terminado. Reiniciando...");
    recognition.start();
};
recognition.onresult = function (event) {
    
    const transcript = event.results[0][0].transcript;
    if (transcript){
    console.log("Texto reconocido:", transcript);
    const textoNormalizado = transcript.replace(/[^\w\s]/gi, "");
    if (textoNormalizado.includes("ver detalles covid")) {
        console.log("Te he escuchado");
        
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6WyJhZG1pbiIsIkN1c3RvbU9iamVjdENhbkJlQWRkZWRIZXJlIl0sIm5iZiI6MTcxMjA1ODI5NSwiZXhwIjoxNzEyNjYzMDk1LCJpYXQiOjE3MTIwNTgyOTV9.wXM7RKCGWUR2hbAvZygQf4CV_CyA5H52eP4g-dNbyGo";
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
                          
            })
            .catch((error) => console.error(error));
            
    } else if (textoNormalizado.includes("ver detalles ADN")) {
        console.log("Te he escuchado");
    
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6WyJhZG1pbiIsIkN1c3RvbU9iamVjdENhbkJlQWRkZWRIZXJlIl0sIm5iZiI6MTcxMjA1ODI5NSwiZXhwIjoxNzEyNjYzMDk1LCJpYXQiOjE3MTIwNTgyOTV9.wXM7RKCGWUR2hbAvZygQf4CV_CyA5H52eP4g-dNbyGo";
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
                               
            })
            .catch((error) => console.error(error));
    
    
    } else if (textoNormalizado.includes("ocultar detalles covid")) {
        console.log("Ocultar detalles Covid");
    
        var circleToRemove = document.getElementById('new-circle-covid');
        if (circleToRemove) {
            circleToRemove.parentNode.removeChild(circleToRemove);
        }
    } else if (textoNormalizado.includes("ocultar detalles adn")) {
        console.log("Ocultar detalles ADN");
    
        var circleToRemove = document.getElementById('new-circle-adn');
        if (circleToRemove) {
            circleToRemove.parentNode.removeChild(circleToRemove);
        }
    }
}
};
recognition.onerror = function (event) {
    console.error("Error de reconocimiento de voz:", event.error);
};
recognition.start();
    

    
    

