const cardsArray = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeIRYyQcdYTRBK7SDMllM6iMpF-pkYGQWAZg&s", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeIRYyQcdYTRBK7SDMllM6iMpF-pkYGQWAZg&s", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC99xrcqY7nlf2qGQoby4ahA-hdTh2YIs_UfjOcE-md4ITze5dFafaVthRroRTL8NALxY&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC99xrcqY7nlf2qGQoby4ahA-hdTh2YIs_UfjOcE-md4ITze5dFafaVthRroRTL8NALxY&usqp=CAU",
   "https://www.loudegg.com/wp-content/uploads/2020/10/Tweety-Bird.jpg", "https://www.loudegg.com/wp-content/uploads/2020/10/Tweety-Bird.jpg", "https://www.livemint.com/lm-img/img/2023/04/21/900x1600/Winnie_Pooh_shared_by_lemon_boost_on_We_Heart_It_1682041648751_1682041653496.jpg", "https://www.livemint.com/lm-img/img/2023/04/21/900x1600/Winnie_Pooh_shared_by_lemon_boost_on_We_Heart_It_1682041648751_1682041653496.jpg",
  "https://w7.pngwing.com/pngs/334/169/png-transparent-dora-the-explorer-dora-the-explorer-animated-cartoon-cartoon-character-miscellaneous-child-room.png", "https://w7.pngwing.com/pngs/334/169/png-transparent-dora-the-explorer-dora-the-explorer-animated-cartoon-cartoon-character-miscellaneous-child-room.png", "https://www.animaker.com/hub/wp-content/uploads/2023/03/Sanrio_Characters_Hello_Kitty_Image026-265x300.webp", "https://www.animaker.com/hub/wp-content/uploads/2023/03/Sanrio_Characters_Hello_Kitty_Image026-265x300.webp",
   "https://easydrawingguides.com/wp-content/uploads/2017/03/how-to-draw-a-cartoon-girl-featured-image-1200-591x1024.png", "https://easydrawingguides.com/wp-content/uploads/2017/03/how-to-draw-a-cartoon-girl-featured-image-1200-591x1024.png", "https://www.loudegg.com/wp-content/uploads/2020/10/Papa-Smurf.jpg", "https://www.loudegg.com/wp-content/uploads/2020/10/Papa-Smurf.jpg"
];

let attempts = 0;
let firstCard, secondCard;
let hasFlippedCard = false;
let lockBoard = false;
let matchedPairs = 0;
let timerInterval;
let time = 0;

const gameGrid = document.getElementById('game-grid');
const attemptsCounter = document.getElementById('attempts');
const timeCounter = document.getElementById('time');
const difficultySelect = document.getElementById('difficulty');

function startGame() {
  resetGame();
  const shuffledCards = shuffle(cardsArray.slice(0, getCardCount()));
  createCards(shuffledCards);
  startTimer();
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function createCards(cardList) {
  gameGrid.innerHTML = '';
  cardList.forEach(cardImage => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">?</div>
        <div class="card-back">
          <img src="${cardImage}" alt="Card Image">
        </div>
      </div>
    `;
    card.addEventListener('click', flipCard);
    gameGrid.appendChild(card);
  });
}


function flipCard() {
  if (lockBoard || this === firstCard) return;
  
  this.classList.add('flipped');
  
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  lockBoard = true;
  attempts++;
  attemptsCounter.textContent = attempts;
  
  const firstCardValue = firstCard.querySelector('.card-back img').src;
  const secondCardValue = secondCard.querySelector('.card-back img').src;

  if (firstCardValue === secondCardValue) {
    matchedPairs++;
    if (matchedPairs === getCardCount() / 2) endGame();
    resetBoard();
  } else {
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      resetBoard();
    }, 1000);
  }
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function resetGame() {
  attempts = 0;
  matchedPairs = 0;
  time = 0;
  clearInterval(timerInterval);
  attemptsCounter.textContent = attempts;
  timeCounter.textContent = time;
}

function startTimer() {
  timerInterval = setInterval(() => {
    time++;
    timeCounter.textContent = time;
  }, 1000);
}

function endGame() {
  clearInterval(timerInterval);
  alert(`Game Over! You completed the game in ${attempts} attempts and ${time} seconds.`);
}

function getCardCount() {
  const difficulty = difficultySelect.value;
  if (difficulty === 'easy') return 8;
  if (difficulty === 'medium') return 12;
  return 16;
}

document.getElementById('restart').addEventListener('click', startGame);
difficultySelect.addEventListener('change', startGame);

// Start the game initially
startGame();
