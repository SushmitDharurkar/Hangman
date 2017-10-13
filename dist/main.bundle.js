webpackJsonp(["main"],{

/***/ "../../../../../src/$$_gendir lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	return new Promise(function(resolve, reject) { reject(new Error("Cannot find module '" + req + "'.")); });
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_gendir lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".dashes {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n\n.space {\n  padding-left: 5px;\n  padding-right: 5px;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\n<div style=\"text-align:center\">\n  <h1>\n    Welcome to {{title}}!\n  </h1>\n\n  <img width=\"300\" src = {{img_src}} />\n</div>\n\n<div class = \"dashes\">\n  <p class=\"space\" *ngFor = \"let d of dashes\">{{ d }}\n</div>\n\n<!--<p>{{incorrectGuessesCountMsg}}-->\n\n<div style=\"text-align:center\">\n\n<p *ngIf = \"endGame\">You lost!!!\n\n<p *ngIf = \"wonGame\">You won!!!\n\n<p> <button *ngIf = \"endGame || wonGame\"\n    md-button (click) = \"playAgain()\">Play Again</button>\n</div>\n\n<div style=\"text-align:center\">\n  <form #thisform = \"ngForm\">\n    <md-form-field>\n      <input size = \"2\" [(ngModel)]=\"letter\" name=\"letter\" maxlength=\"1\">\n      <button md-button (click) = \"onSubmit()\">Submit</button>\n    </md-form-field>\n  </form>\n\n  <p *ngIf = \"!guess\">{{incorrectGuessMsg}}\n\n  <!-- Find a condition here -->\n  <p *ngIf = \"!guess\">Incorrect Guesses: {{incorrectGuessesList}}\n\n  <p *ngIf = \"guess\">Incorrect Guesses: {{incorrectGuessesList}}\n\n  <p *ngIf = \"wins || loses\">Wins: {{wins}}\n  <p *ngIf = \"loses || wins\">Loses: {{loses}}\n  <!-- <div class = \"dashes\">\n    <p class=\"space\" *ngFor = \"let guessedChar of incorrectGuessesList\">{{guessedChar}}\n  </div>-->\n\n<!--\n  <ul>\n    <li *ngFor = \"let guessedChar of incorrectGuessesList\"> {{guessedChar}} </li>\n  </ul>\n-->\n\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = (function () {
    function AppComponent(http) {
        var _this = this;
        this.http = http;
        this.title = 'Hangman';
        http.get('/api/word')
            .subscribe(function (response) {
            _this.response = response;
            _this.dashes = _this.response.dashes;
            _this.guess = true;
            _this.wins = 0;
            _this.loses = 0;
            _this.endGame = false;
            _this.wonGame = false;
            _this.img_src = "../../assets/Images/hangman_0.jpg";
            _this.incorrectGuessesList = [];
        }, function (err) {
            console.log('Error occurred in first response' + err);
        });
    }
    AppComponent.prototype.onSubmit = function () {
        var _this = this;
        this.guess = true;
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpParams */]();
        params = params.append('letter', this.letter);
        this.http.get('/api/guessedResponse', { params: params })
            .subscribe(function (response) {
            _this.guessedResponse = response;
            _this.displayOutput();
        }, function (err) {
            console.log('Error occurred in guessedResponse response' + err);
        });
    };
    AppComponent.prototype.displayOutput = function () {
        if (this.guessedResponse.guess) {
            this.dashes = this.guessedResponse.dashes;
            this.wonGame = this.guessedResponse.wonGame;
            if (this.wonGame) {
                this.wonGame = true;
                this.wins = this.guessedResponse.wins;
                this.loses = this.guessedResponse.loses;
            }
        }
        else {
            this.displayWrongGuess();
        }
        this.letter = "";
    };
    AppComponent.prototype.displayWrongGuess = function () {
        this.guess = false;
        this.incorrectGuessesList.push(this.letter);
        //console.log(this.incorrectGuessesList);
        this.incorrectGuessMsg = "Your guessed letter: " + this.letter + " was incorrect.";
        this.incorrectGuessesCount = this.guessedResponse.incorrectGuesses;
        this.img_src = "../../assets/Images/hangman_" + this.incorrectGuessesCount + ".jpg";
        this.incorrectGuessesCountMsg = "Incorrect Guesses: " + this.incorrectGuessesCount;
        if (this.guessedResponse.endGame) {
            this.endGame = true;
            this.wins = this.guessedResponse.wins;
            this.loses = this.guessedResponse.loses;
        }
    };
    AppComponent.prototype.playAgain = function () {
        var _this = this;
        this.dashes = [];
        this.http.get('/api/playAgain')
            .subscribe(function (response) {
            _this.response = response;
            _this.dashes = _this.response.dashes;
            _this.guess = true;
            _this.endGame = false;
            _this.wonGame = false;
            _this.img_src = "../../assets/Images/hangman_0.jpg";
            _this.incorrectGuessesList = [];
            _this.incorrectGuessesCount = 0;
            _this.incorrectGuessesCountMsg = "";
            _this.wins = _this.response.wins;
            _this.loses = _this.response.loses;
        }, function (err) { return console.log('Error occurred in first response' + err); });
    };
    return AppComponent;
}());
AppComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]) === "function" && _a || Object])
], AppComponent);

var _a;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_http__["b" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["b" /* HttpClientModule */],
            __WEBPACK_IMPORTED_MODULE_6__angular_material__["a" /* MatButtonModule */]
        ],
        providers: [],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */]],
        schemas: [__WEBPACK_IMPORTED_MODULE_1__angular_core__["i" /* CUSTOM_ELEMENTS_SCHEMA */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_20" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map