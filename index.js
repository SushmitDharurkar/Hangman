var request = require('request');
var bodyParser = require('body-parser'); //For populating req.body in HTTP request in express.js which is undefined by default
var express = require('express');
var randomWord = require('random-word');

var app = express();

app.use(bodyParser.json());	// for parsing application/json

var server = app.listen(3000);

console.log("Server running at port 3000");

var words_list = ["first", "second", "third", "sadas", "asdasd", "zzz", "a"];
//Use some library instead
//var count = 0

app.get('/', function (req, res) {
  current_word = words_list[Math.floor(Math.random() * words_list.length)];
  current_word_len = current_word.length;
  res.send({
    len : current_word_len
  });
  /*count++
  res.send("Val: " + count)*/
})

var check_guess = function (c){
  var guess = false;
  var indexes = [];
  for(var i=0; i<current_word_len; i++){
    if (c == current_word[i]){
      guess = true;
      indexes.push(i);
    }
  }
  res.send({
    guess : guess,
    indexes : indexes
  });
}

app.post('/', function (req, res) {

  res.send("Val: " + count);
})
