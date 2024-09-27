const player = document.getElementById("player");
const ball = document.getElementById("ball");
const scoreDisplay = document.getElementById("score");
const startButton = document.getElementById("start-button"); 

// Impostazioni iniziali del gioco
let playerSpeed = 20; // Velocità del giocatore
let ballSpeed = 2;    // Velocità della palla
let score = 0;        // Punteggio iniziale
let ballFallingInterval; // Intervallo per far cadere la palla

// Funzione per aggiornare il punteggio con l'effetto di transizione
function updateScore() {
    scoreDisplay.textContent = `Punteggio: ${score}`;
    scoreDisplay.classList.add('active');
    setTimeout(() => {
        scoreDisplay.classList.remove('active');
    }, 300);
}

// Movimento del giocatore
document.addEventListener("keydown", (event) => {
    const playerRect = player.getBoundingClientRect();
    const containerRect = player.parentElement.getBoundingClientRect();
    
    if (event.key === "ArrowLeft" && playerRect.left > containerRect.left) {
        player.style.left = `${playerRect.left - containerRect.left - playerSpeed}px`;
    } else if (event.key === "ArrowRight" && playerRect.right < containerRect.right) {
        player.style.left = `${playerRect.left - containerRect.left + playerSpeed}px`;
    }
});

// Funzione per far cadere la palla
function dropBall() {
    // Imposta la posizione iniziale della palla
    ball.style.top = "0px";
    ball.style.left = `${Math.random() * (470)}px`; // Palla appare in posizione casuale
    
    // Avvia il movimento della palla verso il basso
    ballFallingInterval = setInterval(() => {
        const ballRect = ball.getBoundingClientRect();
        const playerRect = player.getBoundingClientRect();
        const containerRect = player.parentElement.getBoundingClientRect();
        
        // Verifica se la palla ha raggiunto il fondo del contenitore
        if (ballRect.bottom >= containerRect.bottom) {
            // Controlla se il giocatore ha catturato la palla
            if (ballRect.left >= playerRect.left && ballRect.right <= playerRect.right) {
                score++; // Incrementa il punteggio
                updateScore(); // Aggiorna il punteggio con effetto
                clearInterval(ballFallingInterval); // Ferma il movimento della palla
                dropBall(); // Ricomincia con una nuova palla
            } else {
                // Se la palla non viene catturata, il gioco finisce
                alert(`Gioco terminato! Punteggio finale: ${score}`);
                clearInterval(ballFallingInterval); 
                score = 0; 
                updateScore(); 
                startButton.style.visibility = 'visible'; // Rendi visibile il pulsante Start
            }
        } else {
            // Continua a far cadere la palla
            ball.style.top = `${ballRect.top - containerRect.top + ballSpeed}px`;
        }
    }, 30); // Intervallo di 30 ms
}

// Funzione avviare il gioco quando si preme il pulsante Start
startButton.addEventListener("click", () => {
    startButton.style.visibility = 'hidden'; // Nasconde il pulsante mantenendo il suo spazio
    dropBall(); 
});
