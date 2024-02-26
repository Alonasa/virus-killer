const rows = document.getElementsByTagName("tr");
const cells = document.getElementsByTagName("td");
const bestTime = document.getElementsByClassName("counter-time");

const size = 10;
let score = 0;
let lastRecord = 1000;
let newRecord = 0;

bestTime[0].innerText = lastRecord;


let virusX = randomInteger(1, rows.length - 1);
let virusY = randomInteger(1, rows.length - 1);

let doctorX = 0;
let doctorY = 0;

const virus = document.createElement("img");
virus.src = "img/virus.png";
const doctor = document.createElement("img");
doctor.src = "img/doctor1.png";

function countRecord() {
  newRecord += 1;
  console.log(`You got: ${newRecord}`)
}

function randomInteger(min, max) {
  // Get random amount (min-0.5) до (max+0.5)
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

setInterval(countRecord, 1000)

function moveDoctor() {
  const counter = document.getElementsByClassName("counter-amount");
  const audios = document.getElementsByTagName("audio");
  const doctorIndex = doctorX + doctorY * rows.length;
  
  
  if (doctorX === virusX && doctorY === virusY) {
    while (doctorX === virusX && doctorY === virusY) {
      virusX = randomInteger(0, rows.length - 1);
      virusY = randomInteger(0, rows.length - 1);
    }
    
    score += 1;
    counter[0].innerText++;
    audios[0].currentTime = 0;
    audios[0].play();
    moveVirus();
    
    if (score % size === 0) {
      let amtTime = newRecord > 60 ? newRecord / 60 : newRecord
      if (newRecord < lastRecord){
        lastRecord = newRecord;
        bestTime[0].innerText = lastRecord;
        alert(`You hit ${size} viruses about ${amtTime.toFixed(0)} seconds`)
      }
      newRecord = 0;
    }
  }
  console.log(score)
  
  cells[doctorIndex].append(doctor);
}

function moveVirus() {
  let virusIndex = virusX + virusY * rows.length;
  cells[virusIndex].append(virus);
}

document.onkeypress = function (event) {
  if (event.code === "KeyW") {
    if (doctorY > 0) {
      doctorY--;
    }
  }
  
  if (event.code === "KeyS") {
    if (doctorY < rows.length - 1) {
      doctorY++;
    }
  }
  
  if (event.code === "KeyD") {
    if (doctorX < rows.length - 1) {
      doctorX++;
    }
  }
  
  if (event.code === "KeyA") {
    if (doctorX > 0) {
      doctorX--;
    }
  }
  
  moveDoctor();
}

moveDoctor();
moveVirus();