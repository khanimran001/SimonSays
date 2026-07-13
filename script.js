let gameSeq = [];
let userSeq = [];
let highScore = localStorage.getItem("highScore") || 0;

let btns = ["red", "green", "yellow", "purple"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", () => {
    if (started == false) {
        started = true;

        levelUp();
    }
});

function btnFlash(btn) {
    btn.classList.add("flash");

    setTimeout(function () {
        btn.classList.remove("flash");
    }, 100);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerHTML = `Level ${level} <br> High Score - ${highScore}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    btnFlash(randBtn);
}

function checkAns(idx) {

    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 500);
        }

    }
    else {
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br>Press any key to start.`;

        if(level > highScore)
        {
            highScore = level;
        }

        localStorage.setItem("highScore", highScore);
        document.querySelector("body").style.backgroundColor = "red";

        setTimeout(() => {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

function btnPress() {
    btnFlash(this);
    let userColor = this.getAttribute("id");

    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    gameSeq = [];
    started = false;
    userSeq = [];
    level = 0;
}