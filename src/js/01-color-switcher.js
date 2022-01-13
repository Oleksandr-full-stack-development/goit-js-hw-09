const startBtn = document.querySelector("button[data-start]");
const stopBtn = document.querySelector("button[data-stop");
const body = document.querySelector('body');
let timerId = null;

startBtn.addEventListener("click", () => {
  timerId = setInterval(() => {
    changeColor(getRandomHexColor());
  }, 1000);
  startBtn.setAttribute('disabled',true);
});

 
stopBtn.addEventListener("click", () => {
  clearInterval(timerId);
  startBtn.removeAttribute('disabled');
});

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

function changeColor(bodyColor) {
   const color =  bodyColor;
   body.style.backgroundColor = color;
}
