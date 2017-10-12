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
    letter: string;
    len;
    dashes;
    output;
    guess;
    endGame;
    wonGame;
    missingSlots;
    incorrectGuessesList;
    incorrectGuessesCount;
    incorrectGuessesCountMsg;
    incorrectGuessMsg;
    img_src;
    endGameMsg;
    wonGameMsg;
    response: any;
    guessedResponse: any;

    //api = 'http://localhost:3000/api';

    constructor(private http: HttpClient) {
        // http.get(this.api + '/word')
        http.get('/api/word')
            .subscribe(
                (response) => {
                  this.response = response;
                  this.len = this.response.len;
                  this.dashes = Array(this.len).fill('_');
                  this.output = Array(this.len);
                  this.missingSlots = true;
                  this.guess = true;
                  this.endGame = false;
                  this.wonGame = false;
                  this.img_src = "../../assets/Images/hangman_0.jpg";
                  this.incorrectGuessesList = [];
                  },
                (err) => {
                  console.log('Error occurred in first response' + err);
                },
            );
    }

    onSubmit() {
        this.guess = true;
        let params = new HttpParams();
        params = params.append('letter', this.letter);
        // this.http.get(this.api + '/guessedResponse', {params: params})
        this.http.get('/api/guessedResponse', {params: params})
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
    }

    displayOutput() {
        if (this.guessedResponse.guess) {
            _.forEach(this.guessedResponse.indexes, function (index) {
                this.output[index] = this.letter;
                this.dashes[index] = this.letter;
                //this.dashesindex * 2 = this.letter;
            }, this);

            for(var i=0; i<this.output.length; i++){
                if(this.output[i] === undefined){
                  this.missingSlots = true;
                  break;
                }
                else if (i == this.output.length - 1 && this.output[i]) {
                  this.missingSlots = false;
                }
            }
            if(!this.missingSlots){
              console.log("You won!");
              this.wonGame = true;
              this.wonGameMsg = "You won!";
            }
            //console.log(this.output);
            console.log(this.dashes);
        }
        else {
            this.displayWrongGuess();
        }
        this.letter = "";
    }

    playAgain() {
        this.output = [];
        // this.http.get(this.api + '/word')
        this.http.get('/api/word')
            .subscribe(
                (response) => {
                  this.response = response;
                  this.len = this.response.len;
                  this.output = Array(this.len);
                  this.dashes = Array(this.len).fill('_');
                  this.missingSlots = true;
                  this.guess = true;
                  this.endGame = false;
                  this.wonGame = false;
                  this.img_src = "../../assets/Images/hangman_0.jpg";
                  this.incorrectGuessesList = [];
                  this.incorrectGuessesCount = 0;
                  this.incorrectGuessesCountMsg = "";
                },
                (err) => console.log('Error occurred in first response' + err),
            );
    }

    displayWrongGuess() {
      this.guess = false;
      this.incorrectGuessesList.push(this.letter);
      console.log(this.incorrectGuessesList);
      this.incorrectGuessMsg = "Your guessed letter: " + this.letter + " was incorrect.";
      this.incorrectGuessesCount = this.guessedResponse.incorrectGuesses;
      this.img_src = "../../assets/Images/hangman_"+ this.incorrectGuessesCount +".jpg";
      this.incorrectGuessesCountMsg = "Incorrect Guesses: " + this.incorrectGuessesCount;
      if (this.guessedResponse.endGame){
        this.endGame = true;
        this.endGameMsg = "You lost!";
      }
    }
}
