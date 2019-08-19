// Zobacz gotowy projekt: https://websamuraj.pl/examples/js/projekt7/

const gameSummary = {
  numbers: 0,
  wins: 0,
  losses: 0,
  draws: 0,
}

const game = {
  playerHand: "",
  aiHand: "",

}

const choiceHands = [...document.querySelectorAll('.select img')];


//pierwsza funckja
function handSelection() {
  // console.log(this);
  game.playerHand = this.dataset.option;
  choiceHands.forEach(hand => hand.style.boxShadow = "");
  this.style.boxShadow = "0 0 0 5px  yellow";
};

function checkResult(player, ai) {
  if (player === ai) {
    return 'draw';
  } else if ((player === "papier" && ai === "kamień") || (player === "kamień" && ai === "nożyczki") || (player === "nożyczki" && ai === "papier")) {
    return 'win';
  } else {
    return 'lose';
  }

}
//Publikacja wyników
function publishResult(player, ai, result) {
  document.querySelector('[data-summary="your-choice"]').textContent = player;
  document.querySelector('[data-summary="ai-choice"]').textContent = ai;
  document.querySelector('p.numbers span').textContent = ++gameSummary.numbers;

  if (result === "win") {
    document.querySelector('p.wins span').textContent = ++gameSummary.wins;
    document.querySelector('[data-summary="who-win"]').textContent = "Brawo Wygrałeś/aś";
    document.querySelector('[data-summary="who-win"]').style.color = "green";
  } else if (result === "lose") {
    document.querySelector('p.losses span').textContent = ++gameSummary.losses;
    document.querySelector('[data-summary="who-win"]').textContent = "Do dupy, komputer wygrał";
    document.querySelector('[data-summary="who-win"]').style.color = "red";
  } else {
    document.querySelector('p.draws span').textContent = ++gameSummary.draws;
    document.querySelector('[data-summary="who-win"]').textContent = "Tak nie za dobrze, nie za słabo bo remis";
    document.querySelector('[data-summary="who-win"]').style.color = "yellow";
  }

}

function endGame() {
  document.querySelector(`[data-option="${game.playerHand}"]`).style.boxShadow = "";
  game.playerHand = "";
}
//funkcja startujaca
function computerChoice() {
  const aiHand = choiceHands[Math.floor(Math.random() * 3)].dataset.option;
  return aiHand;
}

function startGame() {
  if (!game.playerHand) {
    return alert('please wybierz dłoń');
  }

  game.aiHand = computerChoice();
  const gameResult = checkResult(game.playerHand, game.aiHand);
  console.log(gameResult);
  publishResult(game.playerHand, game.aiHand, gameResult);
  endGame();
}
choiceHands.forEach(hand => hand.addEventListener('click', handSelection));

document.querySelector('.start').addEventListener('click', startGame);