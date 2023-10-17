let timer;
let isRunning = false;
let workTime = 10 * 60; // 10 minutes in seconds

const startButton = document.getElementById("start-button");
const resetButton = document.getElementById("reset-button");
const timerDisplay = document.getElementById("timer");
const progressBar = document.getElementById("progress-bar");
const audio = document.getElementById("audio");

startButton.addEventListener("click", () => {
    if (isRunning) {
        clearInterval(timer);
        startButton.innerText = "Start";
        resetButton.style.display = "inline"; // Mostra o botão "Reset" quando o temporizador está em pausa
        isRunning = false;
    } else {
        startButton.innerText = "Pause";
        resetButton.style.display = "none"; // Oculta o botão "Reset" quando o temporizador é reiniciado
        startTimer(workTime);
    }
});

resetButton.addEventListener("click", () => {
    clearInterval(timer);
    timerDisplay.innerText = `${Math.floor(workTime / 60)}:00`;
    startButton.innerText = "Start";
    resetButton.style.display = "none"; // Oculta o botão "Reset" quando o temporizador é reiniciado
    progressBar.style.width = "100%"; // Reinicia a barra de progresso
    isRunning = false;
});

function startTimer(duration) {
    let timerEnd = Date.now() + duration * 1000;

    timer = setInterval(function () {
        let now = Date.now();
        let timeLeft = (timerEnd - now) / 1000;
        let progress = ((duration - timeLeft) / duration) * 100;

        if (timeLeft < 0) {
            clearInterval(timer);
            audio.play();
            timerDisplay.innerText = "0:00";
            startButton.innerText = "Start";
            resetButton.style.display = "inline"; // Mostra o botão "Reset" quando o temporizador atinge 0:00
        } else {
            let minutes = Math.floor(timeLeft / 60);
            let seconds = Math.floor(timeLeft % 60);
            timerDisplay.innerText = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
            progressBar.style.width = `${100 - progress}%`;
        }
    }, 1000);

    isRunning = true;
}
