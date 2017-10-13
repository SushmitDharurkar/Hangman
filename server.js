const randomWord = require('random-word');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const session = require('express-session')
const MemcachedStore = require('connect-memcached')(session);
const app = express();
// const api = require('./server/routes/api');

//Sessions and Memcache
app.use(session({
      secret  : 'this-is-a-secret',
      resave: false,
      saveUninitialized: true,
      store   : new MemcachedStore({
        hosts: ['localhost:11211'],
        secret: 'another-secret-here'
    })
}));

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

// API location
// app.use('/api', api);

app.get('/word', (req, res) => {
  console.log("server was called");

  var current_word = randomWord();
  current_word = current_word.toLowerCase();
  // console.log(current_word);
  var dashes = Array(current_word.length).fill('_');

  req.session.current_word = current_word;
  req.session.dashes = dashes;
  req.session.missingSlots = true;
  req.session.incorrectGuesses = 0;

  if (req.session.wins === undefined){
    wins = 0;
  }
  else {
    wins = req.session.wins;
  }
  if (req.session.loses === undefined){
    loses = 0;
  }
  else {
    loses = req.session.loses;
  }

  res.json({
    dashes : dashes,
    loses : loses,
    wins : wins
  });
})

app.get('/guessedResponse', (req, res) => {
  console.log("Guessed Response")

  var guess = false;
  var endGame = false;
  var wonGame = false;

  var c = req.query.letter;
  var c = c.toLowerCase();

  //Add code for repeated chars
  if (req.session.wins === undefined){
    wins = 0;
  }
  else {
    wins = req.session.wins;
  }
  if (req.session.loses === undefined){
    loses = 0;
  }
  else {
    loses = req.session.loses;
  }
  missingSlots = req.session.missingSlots;
  incorrectGuesses = req.session.incorrectGuesses;
  dashes = req.session.dashes;
  current_word = req.session.current_word;

  console.log(incorrectGuesses);
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
    req.session.wins = wins;
  }

  if (!guess){
    incorrectGuesses++;
    req.session.incorrectGuesses = incorrectGuesses;
    if (incorrectGuesses >= 10){
      endGame = true;
      loses++;
      req.session.loses = loses;
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

// Send all other requests to the Angular app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//Set Port
// const port = process.env.PORT || '3000';
//const port = process.env.PORT || '8080';
app.listen(process.env.PORT || 8080);
// app.set('port', port);

// const server = http.createServer(app);

// server.listen(port, () => console.log(`Running on localhost:${port}`));
