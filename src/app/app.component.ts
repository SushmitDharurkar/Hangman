import {Component} from '@angular/core';
import * as _ from 'underscore';
import {HttpClient, HttpParams} from '@angular/common/http';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Hangman';
    letter;
    dashes;
    guess;
    endGame;
    wonGame;
    wins;
    loses;
    guessesList;
    alreadyGuessed
    incorrectGuessesList;
    incorrectGuessesCount;
    incorrectGuessesCountMsg;
    incorrectGuessMsg;
    img_src;
    response;
    guessedResponse;

    constructor(private http: HttpClient) {
        http.get('/word')
            .subscribe(
                (response) => {
                  this.response = response;
                  this.dashes = this.response.dashes;
                  this.guess = true;
                  this.wins = this.response.wins;
                  this.loses = this.response.loses;
                  this.endGame = false;
                  this.wonGame = false;
                  this.img_src = "../../assets/Images/hangman_0.jpg";
                  this.incorrectGuessesList = [];
                  this.guessesList = [];
                  },
                (err) => {
                  console.log('Error occurred in first response' + err);
                },
            );
    }

    onSubmit() {
        this.guess = true;
        this.alreadyGuessed = false;
        for (var i =0 ; i< this.guessesList.length; i++){
          if (this.guessesList[i] == this.letter){
            this.alreadyGuessed = true;
            break;
          }
        }

        if (!this.alreadyGuessed){
          let params = new HttpParams();
          params = params.append('letter', this.letter);
          this.http.get('/guessedResponse', {params: params})
              .subscribe(
                (response) =>
                      {
                        this.guessedResponse = response;
                        this.displayOutput();
                      },
                   (err) => {
                     console.log('Error occurred in guessedResponse response' + err);
                   }
              );
          this.guessesList.push(this.letter);
        }
    }

    displayOutput() {
        if (this.guessedResponse.guess) {
            this.dashes = this.guessedResponse.dashes;
            this.wonGame = this.guessedResponse.wonGame;
            if(this.wonGame){
              this.wonGame = true;
              this.wins = this.guessedResponse.wins;
              this.loses = this.guessedResponse.loses;
            }
        }
        else {
            this.displayWrongGuess();
        }
        this.letter = "";
    }

    displayWrongGuess() {
      this.guess = false;
      this.incorrectGuessesList.push(this.letter);
      //console.log(this.incorrectGuessesList);
      this.incorrectGuessMsg = "Your guessed letter: " + this.letter + " was incorrect.";
      this.incorrectGuessesCount = this.guessedResponse.incorrectGuesses;
      this.img_src = "../../assets/Images/hangman_"+ this.incorrectGuessesCount +".jpg";
      this.incorrectGuessesCountMsg = "Incorrect Guesses: " + this.incorrectGuessesCount;
      if (this.guessedResponse.endGame){
        this.endGame = true;
        this.wins = this.guessedResponse.wins;
        this.loses = this.guessedResponse.loses;
      }
    }

    playAgain() {
        this.dashes = [];
        this.http.get('/word')
            .subscribe(
                (response) => {
                  this.response = response;
                  this.dashes = this.response.dashes;
                  this.guess = true;
                  this.endGame = false;
                  this.wonGame = false;
                  this.img_src = "../../assets/Images/hangman_0.jpg";
                  this.incorrectGuessesList = [];
                  this.guessesList = [];
                  this.incorrectGuessesCount = 0;
                  this.incorrectGuessesCountMsg = "";
                  this.wins = this.response.wins;
                  this.loses = this.response.loses;
                },
                (err) => console.log('Error occurred in first response' + err),
            );
    }
}
