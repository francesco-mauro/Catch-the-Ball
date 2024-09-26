
const player = document.getElementById("player");
const ball = document.getElementById("ball");
const scoreDisplay = document.getElementById("score");

let playerSpeed = 10;
let ballSpeed = 5;
let score = 0;
let ballFallingInterval;


document.addEventListener("keydown", (event) => {
    const playerRect = player.getBoundingClientRect();
    const containerRect = player.parentElement.getBoundingClientRect();
    
    if (event.key === "ArrowLeft" && playerRect.left > containerRect.left) {
        player.style.left = `${playerRect.left - containerRect.left - playerSpeed}px`;
    } else if (event.key === "ArrowRight" && playerRect.right < containerRect.right) {
        player.style.left = `${playerRect.left - containerRect.left + playerSpeed}px`;
    }
});


function dropBall() {
    ball.style.top = "0px";
    ball.style.left = `${Math.random() * (470)}px`; 
    
    ballFallingInterval = setInterval(() => {
        const ballRect = ball.getBoundingClientRect();
        const playerRect = player.getBoundingClientRect();
        const containerRect = player.parentElement.getBoundingClientRect();
        
        
        if (ballRect.bottom >= containerRect.bottom) {
            if (ballRect.left >= playerRect.left && ballRect.right <= playerRect.right) {
                
                score++;
                scoreDisplay.textContent = `Punteggio: ${score}`;
                clearInterval(ballFallingInterval);
                dropBall();
            } else {
                
                alert(`Gioco terminato! Punteggio finale: ${score}`);
                clearInterval(ballFallingInterval);
                score = 0;
                scoreDisplay.textContent = `Punteggio: 0`;
                dropBall();
            }
        } else {
            ball.style.top = `${ballRect.top - containerRect.top + ballSpeed}px`;
        }
    }, 30);
}


dropBall();
