const express = require('express');
const randomWord = require('random-word');
const router = express.Router();
const memjs = require('memjs');

var mc = memjs.Client.create();

router.get('/word', (req, res) => {
  console.log("server was called");

  var current_word = randomWord();
  current_word = current_word.toLowerCase();
  var dashes = Array(current_word.length).fill('_');

  mc.set("current_word", current_word, {expires : 600}, function (err, val){  });
  mc.set("dashes", dashes.toString(), {expires : 600}, function (err, val){  });
  mc.set("missingSlots", "true", {expires : 600}, function (err, val){  });
  mc.set("incorrectGuesses", "0", {expires : 600}, function (err, val){});
  mc.set("wins", "0", {expires : 600}, function (err, val){});
  mc.set("loses", "0", {expires : 600}, function (err, val){});

  res.json({
    dashes : dashes
  });
})

router.get('/playAgain', (req, res) => {
  console.log("server was called again");

  var current_word = randomWord();
  current_word = current_word.toLowerCase();
  var dashes = Array(current_word.length).fill('_');

  mc.set("current_word", current_word, {expires : 600}, function (err, val){  });
  mc.set("dashes", dashes.toString(), {expires : 600}, function (err, val){  });
  mc.set("missingSlots", "true", {expires : 600}, function (err, val){  });
  mc.set("incorrectGuesses", "0", {expires : 600}, function (err, val){});
  mc.get("wins", function (err, val){
    var wins = parseInt(val);
    mc.get("loses", function (err, val){
      var loses = parseInt(val);
      res.json({
        dashes : dashes,
        loses : loses,
        wins : wins
      });
    });
  });
})

router.get('/guessedResponse', (req, res) => {
  console.log("Guessed Response")

  var guess = false;
  var endGame = false;
  var wonGame = false;

  var c = req.query.letter;
  var c = c.toLowerCase();

  //Add code for repeated chars
  mc.get("wins", function (err, val){
    var wins = parseInt(val);
    mc.get("loses", function (err, val){
      var loses = parseInt(val);
      mc.get("missingSlots", function (err, val){
        var missingSlots = val;
        mc.get("incorrectGuesses", function (err, val){ //Returns Buffer
          var incorrectGuesses = parseInt(val);
          console.log("incorrectGuesses: " + incorrectGuesses);

          mc.get("dashes", function (err, val){
            var dashes = val.toString().split(',');

            mc.get("current_word", function (err, val){
              var current_word = val.toString();
              console.log(current_word);

              for(var i=0; i<current_word.length; i++){
                if (c == current_word[i]){
                  guess = true;
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
              mc.set("wins", wins.toString(), {expires : 600}, function (err, val){
                mc.set("loses", loses.toString(), {expires : 600}, function (err, val){
                  mc.set("dashes", dashes.toString(), {expires : 600}, function (err, val){
                    mc.set("missingSlots", missingSlots.toString(), {expires : 600}, function (err, val){
                      mc.set("incorrectGuesses", incorrectGuesses.toString(), {expires : 600}, function (err, val){

                        res.json({
                          guess : guess,
                          dashes : dashes,
                          incorrectGuesses : incorrectGuesses,
                          endGame : endGame,
                          wonGame : wonGame,
                          loses : loses,
                          wins : wins
                        });

                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });

})

module.exports = router;
