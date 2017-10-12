const express = require('express');
const randomWord = require('random-word');
const router = express.Router();

//Need to do something of these global varibales
//These counters remain same if server keeps running
//Need to add all these in sessions or memcache
var incorrectGuesses;
var current_word_len;
var missingSlots;
var current_word;
var dashes;
var wins = 0;
var loses = 0;

router.get('/word', (req, res) => {
  console.log("server was called");
  missingSlots = true;

  current_word = randomWord();
  current_word = current_word.toLowerCase();
  // console.log(current_word);
  current_word_len = current_word.length;
  dashes = Array(current_word_len).fill('_');
  incorrectGuesses = 0;

  res.json({
    dashes : dashes,
    loses : loses,
    wins : wins
  });
})

router.get('/guessedResponse', (req, res) => {
  console.log("Guessed Response")
  // console.log("incorrectGuesses: " + incorrectGuesses)
  // console.log(current_word);
  var guess = false;
  var endGame = false;
  var wonGame = false;
  var indexes = [];

  var c = req.query.letter;
  var c = c.toLowerCase();
  // console.log(c);

  //Add code for repeated chars
  for(var i=0; i<current_word_len; i++){
    if (c == current_word[i]){
      guess = true;
      indexes.push(i);
      dashes[i] = c;
    }
  }

  for(var i=0; i<dashes.length; i++){
      if(dashes[i] === '_'){
        missingSlots = true;
        break;
      }
      else if (i == dashes.length - 1 && dashes[i] != '_') {
        missingSlots = false;
      }
  }
  if(!missingSlots){
    console.log("You won!");
    wonGame = true;
    wins++;
  }

  if (!guess){
    incorrectGuesses++;
    if (incorrectGuesses >= 10){
      endGame = true;
      loses++;
    }
  }
  res.json({
    guess : guess,
    dashes : dashes,
    incorrectGuesses : incorrectGuesses,
    endGame : endGame,
    wonGame : wonGame,
    loses : loses,
    wins : wins
  });
})

module.exports = router;
