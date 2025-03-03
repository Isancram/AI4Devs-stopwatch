let currentScreen = "screen-initial";

function switchScreen(newScreen) {
    document.getElementById(currentScreen).classList.remove("active");
    document.getElementById(newScreen).classList.add("active");
    currentScreen = newScreen;
}

let stopwatchInterval;
let stopwatchTime = 0;
let isStopwatchRunning = false;
const stopwatchDisplay = document.getElementById("stopwatch-display");

function updateStopwatchDisplay() {
    let ms = stopwatchTime % 1000;
    let totalSeconds = Math.floor(stopwatchTime / 1000);
    let hours = Math.floor(totalSeconds / 3600).toString().padStart(2, "0");
    let minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, "0");
    let seconds = (totalSeconds % 60).toString().padStart(2, "0");
    stopwatchDisplay.textContent = `${hours}:${minutes}:${seconds}.${ms.toString().padStart(3, "0")}`;
}

function startStopwatch() {
    if (!isStopwatchRunning) {
        let startTime = Date.now() - stopwatchTime;
        stopwatchInterval = setInterval(() => {
            stopwatchTime = Date.now() - startTime;
            updateStopwatchDisplay();
        }, 10);
        isStopwatchRunning = true;
        document.getElementById("start-stopwatch").textContent = "Pause";
    } else {
        clearInterval(stopwatchInterval);
        isStopwatchRunning = false;
        document.getElementById("start-stopwatch").textContent = "Continue";
    }
}

function resetStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchTime = 0;
    isStopwatchRunning = false;
    updateStopwatchDisplay();
    document.getElementById("start-stopwatch").textContent = "Start";
}

let countdownInterval;
let countdownTime = 0;
const countdownDisplay = document.getElementById("countdown-display");

function updateCountdownDisplay() {
    let ms = countdownTime % 1000;
    let totalSeconds = Math.floor(countdownTime / 1000);
    let hours = Math.floor(totalSeconds / 3600).toString().padStart(2, "0");
    let minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, "0");
    let seconds = (totalSeconds % 60).toString().padStart(2, "0");
    countdownDisplay.textContent = `${hours}:${minutes}:${seconds}.${ms.toString().padStart(3, "0")}`;
}

document.querySelectorAll(".num").forEach(button => {
    button.addEventListener("click", () => {
        countdownTime = countdownTime * 10 + parseInt(button.dataset.value) * 1000;
        updateCountdownDisplay();
    });
});

document.getElementById("clear-countdown").addEventListener("click", () => {
    countdownTime = 0;
    updateCountdownDisplay();
});

function startCountdown() {
    if (!countdownInterval && countdownTime > 0) {
        let endTime = Date.now() + countdownTime;
        countdownInterval = setInterval(() => {
            let remaining = endTime - Date.now();
            if (remaining <= 0) {
                clearInterval(countdownInterval);
                countdownTime = 0;
                updateCountdownDisplay();
                countdownInterval = null;
                document.getElementById("start-countdown").textContent = "Start";
                launchConfetti(); // Llamada a la función de confeti
            } else {
                countdownTime = remaining;
                updateCountdownDisplay();
            }
        }, 10);
        document.getElementById("start-countdown").textContent = "Pause";
    } else {
        clearInterval(countdownInterval);
        countdownInterval = null;
        document.getElementById("start-countdown").textContent = "Continue";
    }
}

function launchConfetti() {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffbb00", "#ff00ff"];
    
    function frame() {
        if (Date.now() > animationEnd) {
            return;
        }
        const confettiElement = document.createElement("div");
        confettiElement.classList.add("confetti");
        confettiElement.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confettiElement.style.left = Math.random() * 100 + "vw";
        confettiElement.style.animationDuration = Math.random() * 3 + 2 + "s";
        document.body.appendChild(confettiElement);
        setTimeout(() => document.body.removeChild(confettiElement), 5000);
        requestAnimationFrame(frame);
    }
    frame();
}

document.getElementById("reset-countdown").addEventListener("click", () => {
    clearInterval(countdownInterval);
    countdownTime = 0;
    updateCountdownDisplay();
    countdownInterval = null;
    document.getElementById("start-countdown").textContent = "Start";
});

document.getElementById("stopwatch-btn").addEventListener("click", () => switchScreen("screen-stopwatch"));
document.getElementById("countdown-btn").addEventListener("click", () => switchScreen("screen-countdown"));
document.getElementById("start-stopwatch").addEventListener("click", startStopwatch);
document.getElementById("reset-stopwatch").addEventListener("click", resetStopwatch);
document.getElementById("start-countdown").addEventListener("click", startCountdown);
document.getElementById("back-stopwatch").addEventListener("click", () => switchScreen("screen-initial"));
document.getElementById("back-countdown").addEventListener("click", () => switchScreen("screen-initial"));