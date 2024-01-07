'use strict';

// Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const showDice = document.querySelector('.dice');
const bntNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// starting consitions
score0El.textContent = 0;
score1El.textContent = 0;
showDice.classList.add('hidden');

let currentScore = 0;
let activePlayer = 0;
let scores = [0, 0];
let playing = true;


// switching players
const switchPlayers = function()
{
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}


// Roll the dice
btnRoll.addEventListener('click', function() {
    if(playing)
    {
        //generate random dice roll
        let guess = Math.trunc(Math.random()*6)+1;
        console.log(guess);
        //display dice roll
        showDice.classList.remove('hidden');
        showDice.src = `dice-${guess}.png`;
        //check if it equal to 1
        if(guess != 1)
        {
            currentScore += guess;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }
        else{
            switchPlayers();
        }
    }
});
   

// hold the dice
btnHold.addEventListener('click',function() {
    if(playing)
    {
        //add current score to total score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        //check if total is greater the 20 or not
        if(scores[activePlayer] >= 100)
        {
            playing = false;
            showDice.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        }
        else {
            //switch players
            switchPlayers(); 
        }
    }
});



// New game
    const newGame = document.querySelector('.btn--new');
    newGame.addEventListener('click', function() {
        playing = true;
        currentScore = 0;
        scores = [0, 0];
        score0El.textContent = 0;
        score1El.textContent = 0;
        current0El.textContent = 0;
        current1El.textContent = 0;
        showDice.classList.remove('hidden');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
        player0El.classList.add('player--active');
        player1El.classList.remove('player--active');
        activePlayer = 0;
    });