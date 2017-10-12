const express = require('express');
const randomWord = require('random-word');
const router = express.Router();

//Need to do something of these global varibales
//These counters remain same if server keeps running
//var words_list = ["first", "second", "third", "sadas", "asdasd", "zzz", "a"];
var incorrectGuesses;
var current_word_len = 0;
var endGame;
//var wins = 0;
//var loses = 0;

router.get('/word', (req, res) => {
  console.log("server was called")
  //current_word = words_list[Math.floor(Math.random() * words_list.length)];
  current_word = randomWord();
  //current_word = "abc";
  current_word_len = current_word.length;
  incorrectGuesses = 0;
  endGame = false;
  res.json({
    len : current_word_len
  });
})

router.get('/guessedResponse', (req, res) => {
  console.log("Guessed Response")
  console.log("incorrectGuesses: " + incorrectGuesses)
  var guess = false;
  var indexes = [];
  var c = req.query.letter;
  //console.log(JSON.stringify(c));
  console.log(c);
  for(var i=0; i<current_word_len; i++){
    if (c == current_word[i]){
      guess = true;
      indexes.push(i);
    }
  }
  if (!guess){
    incorrectGuesses++;
    if (incorrectGuesses >= 10){
      endGame = true;
      //loses++;
    }
  }
  res.json({
    guess : guess,
    indexes : indexes,
    incorrectGuesses : incorrectGuesses,
    endGame : endGame
  });
})

module.exports = router;
