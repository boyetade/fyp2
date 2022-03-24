
// const el = document.querySelector(".timer");

// const mindiv = document.querySelector(".mins");
// const secdiv = document.querySelector(".secs");
// const pauseBtn = document.querySelector(".pause");

// const startBtn = document.querySelector(".start");
// localStorage.setItem("btn", "focus");

// let initial, totalsecs, perc, paused, mins, seconds;

// startBtn.addEventListener("click", () => {
//   let btn = localStorage.getItem("btn");

//   if (btn === "focus") {
//     mins = +localStorage.getItem("focusTime") || 1;
//   } else {
//     mins = +localStorage.getItem("breakTime") || 1;
//   }

//   seconds = mins * 60;
//   totalsecs = mins * 60;
//   setTimeout(decremenT(), 60);
//   startBtn.style.transform = "scale(0)";
//   paused = false;                                                                                                                                                                                                                                                                                                                                                          
// });

// function decremenT() {
//   mindiv.textContent = Math.floor(seconds / 60);
//   secdiv.textContent = seconds % 60 > 9 ? seconds % 60 : `0${seconds % 60}`;
//   if (circle.classList.contains("danger")) {
//     circle.classList.remove("danger");
//   }

//   if (seconds > 0) {
//     perc = Math.ceil(((totalsecs - seconds) / totalsecs) * 100);
//     setProgress(perc);
//     seconds--;
//     initial = window.setTimeout("decremenT()", 1000);
//     if (seconds < 10) {
//       circle.classList.add("danger");
//     }
//   } else {
//     mins = 0;
//     seconds = 0;
    
//     let btn = localStorage.getItem("btn");

//     if (btn === "focus") {a
//       startBtn.textContent = "start break";
//       startBtn.classList.add("break");
//       localStorage.setItem("btn", "break");
//     } else {
//       startBtn.classList.remove("break");
//       startBtn.textContent = "start focus";
//       localStorage.setItem("btn", "focus");
//     }
//     startBtn.style.transform = "scale(1)";
//   }
// }
// document.querySelector(".reset").addEventListener("click", () => {
//   startBtn.style.transform = "scale(1)";
//   clearTimeout(initial);
//   setProgress(0);
//   mindiv.textContent = 0;
//   secdiv.textContent = 0;
// });



// pauseBtn.addEventListener("click", () => {
//   if (paused === undefined) {
//     return;
//   }
//   if (paused) {
//     paused = false;
//     initial = setTimeout("decremenT()", 60);
//     pauseBtn.textContent = "pause";
//     pauseBtn.classList.remove("resume");
//   } else {
//     clearTimeout(initial);
//     pauseBtn.textContent = "resume";
//     pauseBtn.classList.add("resume");
//     paused = true;
//   }
// });


const el = document.querySelector(".clock");
const bell = document.querySelector("audio");

const mindiv = document.querySelector(".mins");
const secdiv = document.querySelector(".secs");

const startBtn = document.querySelector(".start");
localStorage.setItem("btn", "focus");

let initial, totalsecs, perc, paused, mins, seconds;

startBtn.addEventListener("click", () => {
  let btn = localStorage.getItem("btn");

  if (btn === "focus") {
    mins = +localStorage.getItem("focusTime") || 1;
  } else {
    mins = +localStorage.getItem("breakTime") || 1;
  }

  seconds = mins * 60;
  totalsecs = mins * 60;
  setTimeout(decremenT(), 60);
  startBtn.style.transform = "scale(0)";
  pauseBtn.style.transform = "scale(1)";
  resetBtn.style.transform = "scale(1)";
  circle.style.transition = "0.5s";
  paused = false;
});

function decremenT() {
  mindiv.textContent = Math.floor(seconds / 60);
  secdiv.textContent = seconds % 60 > 9 ? seconds % 60 : `0${seconds % 60}`;
  if (circle.classList.contains("danger")) {
    circle.classList.remove("danger");
  }

  if (seconds > 0) {
    perc = Math.ceil(((totalsecs - seconds) / totalsecs) * 100);
    setProgress(perc);
    seconds--;
    initial = window.setTimeout("decremenT()", 1000);
    if (seconds < 10) {
      circle.classList.add("danger");
    }
  } else {
    mins = 0;
    seconds = 0;
    let btn = localStorage.getItem("btn");

    if (btn === "focus") {
      startBtn.textContent = "start break";
      startBtn.classList.add("break");
      localStorage.setItem("btn", "break");
      pauseBtn.style.transform="scale(0)";
      
    } else {
      startBtn.classList.remove("break");
      startBtn.textContent = "start focus";
      localStorage.setItem("btn", "focus");
    }
    startBtn.style.transform = "scale(1)";
  }
}