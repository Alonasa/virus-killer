let size = 10;

    function randomInteger(min, max) {
        // получить случайное число от (min-0.5) до (max+0.5)
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        return Math.round(rand);
    }

    var virus = document.createElement("img");
    virus.src = "img/virus.png";
    var doctor = document.createElement("img");
    doctor.src = "img/doctor1.png";

    var rows = document.getElementsByTagName("tr");
    var cells = document.getElementsByTagName("td");

    var doctorX = 0;
    var doctorY = 0;

    function moveDoctor() {

        if (doctorX === virusX && doctorY === virusY) {
            while (doctorX === virusX && doctorY === virusY){
                virusX = randomInteger(0, rows.length - 1);
            virusY = randomInteger(0, rows.length - 1);
            }
            
            var spans = document.getElementsByTagName("span");
            spans[0].innerText++;
            var audios = document.getElementsByTagName("audio");
            audios[0].currentTime = 0;
            audios[0].play();
            moveVirus();
        }

        var doctorIndex = doctorX + doctorY * rows.length;
        cells[doctorIndex].append(doctor);
    }

    moveDoctor();

    var virusX = randomInteger(1, rows.length -1);
    var virusY =randomInteger(1, rows.length -1);
    
    function moveVirus() {
        var virusIndex = virusX + virusY * rows.length;
        cells[virusIndex].append(virus);
    }
    moveVirus();
    
    document.onkeypress = function(event) {
        if (event.code === "KeyW") {
            if (doctorY > 0){
                doctorY--;
            }
        }

        if (event.code === "KeyS") {
            if (doctorY < rows.length - 1) {
                doctorY++;
            }
        }

        if (event.code === "KeyD") {
            if (doctorX < rows.length -1) {
                doctorX++;
            }
        }
        
        if (event.code === "KeyA") {
            if (doctorX > 0) {
                doctorX--;
            }
        }

        moveDoctor();
        console.log("key pressed: " + event.code);
    }
    