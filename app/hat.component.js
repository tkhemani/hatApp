"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var angularfire2_1 = require('angularfire2');
var button_1 = require('@angular2-material/button');
var input_1 = require('@angular2-material/input');
var card_1 = require('@angular2-material/card');
var radio_1 = require('@angular2-material/radio');
var icon_1 = require('@angular2-material/icon');
var toolbar_1 = require('@angular2-material/toolbar');
var tabs_1 = require('@angular2-material/tabs/tabs');
var HatAppComponent = (function () {
    //     ngOnInit() {
    //     this.el = this.element.nativeElement;
    //     console.log(this.el);
    //   }
    //   ngDoCheck() {
    // this.changeDetected = true;
    //   }
    function HatAppComponent(af, ar) {
        //console.clear();
        //this.af = af;
        this.ar = ar;
        //hang
        this.movie1Entered = false;
        this.movie2Entered = false;
        this.cardLocal = {
            valueEntered: "hell",
            optionUsed: false
        };
        this.challengeAddMoreState = false;
        //heroes = ['Windstorm', 'Bombasto', 'Magneta', 'Tornado'];
        //testitem = { name: "test", cards: [1,2] };
        this.otherPlayerName = null;
        this.gameStarted = false;
        this.e1 = null;
        this.challengeState = false;
        this.myTurn = false;
        this.cardOptions = [
            { value: "1", selected: false },
            { value: "2", selected: false },
            { value: "3", selected: false },
            { value: "4", selected: false },
            { value: "5", selected: false },
            { value: "6", selected: false },
            { value: "7", selected: false },
            { value: "8", selected: false },
            { value: "9", selected: false },
            { value: "10", selected: false },
            { value: "J", selected: false },
            { value: "Q", selected: false },
            { value: "K", selected: false }
        ];
        // af = null;
        this.root = null;
        this.playerName = "";
        // player = null;
        //localCopy = {}
        this.localCopy = {
            "hang": {
                "movie1string": "X",
                "isMovie1success": false,
                "isMovie2success": false,
                "isMovie1GameOver": false,
                "isMovie2GameOver": false,
                "movie2string": "X",
                "movie1": ["X"],
                "movie1state": ["X"],
                "movie2state": ["X"],
                "score1": 0,
                "movie2": ["X"],
                "score2": 0
            },
            "cardCache": [],
            "whoPassed": "",
            "winnerName": "",
            resetState: false,
            "p1": ["X"],
            "p2": ["X"],
            "turnCards": ["X"],
            "playAs": "",
            "whoseTurn": "p1",
            "cardOptions": this.cardOptions
        };
        //"hang" : [{"p1": {"word": "", "score": ""}}, {"p2": {"word": "", "score": ""}}]
        //localCopy = {};
        this.el = null;
        //this.element.nativeElement // <- your direct element reference 
        this.root = af.database.object('/root');
        var that = this;
        this.root.subscribe(function (data) {
            if (data.p1 && data.p1.length > 1)
                data.p1 = data.p1.map(function (n) { return n.value; }).sort().map(function (n) { return { value: n, selected: false }; });
            if (data.p2 && data.p2.length > 1)
                data.p2 = data.p2.map(function (n) { return n.value; }).sort().map(function (n) { return { value: n, selected: false }; });
            that.localCopy = data;
            that.processHangmanData();
            if (!that.localCopy.p1) {
                that.localCopy.p1 = [];
            }
            if (!that.localCopy.p2) {
                that.localCopy.p2 = [];
            }
            that.myTurn = (that.localCopy.whoseTurn == that.playerName);
            //that.localCopy.turnCards =
            if (that.myTurn && that.localCopy.turnCards.length > 1) {
                //  that.localCopy.turnCards.shift();
                if (that.localCopy.turnCards.length > 1) {
                    that.challengeState = true;
                    that.localCopy.turnCards.shift();
                }
                if (that.localCopy.whoPassed != that.localCopy.whoseTurn) {
                    that.challengeState = true;
                }
            }
            //             if (that.localCopy.cardCache && that.localCopy.cardCache.length > 0){
            //                    that.challengeState = true;                   
            //             }
            that.dummyFunction(); // to refresh the screen
        });
        //this.item = af.database.object('/root/item');
        //this.item.remove();
        //this.startGame()
        //this.ngDoCheck();
    }
    HatAppComponent.prototype.dummyCard = function () {
        console.log(this);
    };
    HatAppComponent.prototype.dummyFunction = function () {
        this.ar.tick();
        //     setTimeout(function(){ 
        //  var temp = Object.assign({}, this.localCopy);
        //         this.localCopy = Object.assign({}, temp);
        //      }, 4000);
        //         var temp = Object.assign({}, this.localCopy);
        //         this.localCopy = Object.assign({}, temp);
        //         console.log(this);
        //         if(this.localCopy.cardCache){
        //         this.localCopy.cardCache = this.localCopy.cardCache.slice();           
        //         }
        //         this.challengeState = this.challengeState;
    };
    HatAppComponent.prototype.setPlayer = function (playerName) {
        this.playerName = playerName;
    };
    HatAppComponent.prototype.startGame = function () {
        if (this.playerName == "") {
            this.playerName = "p1";
        }
        this.gameStarted = true;
        if (this.playerName == "p1") {
            //  this.resetGame()
            this.otherPlayerName = "p2";
            //             this.localCopy[this.playerName] = [{value: "5", selected: false}, {
            //                 value: "6",
            //                 selected: false
            //             }, {value: "7", selected: false}, {value: "8", selected: false}];
            var dataSet = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
            this.localCopy[this.playerName] = [];
            this.localCopy[this.otherPlayerName] = [];
            var that = this;
            dataSet.forEach(function (n) {
                var randomNo = Math.floor(Math.random() * 2) + 1;
                if (randomNo == 1 && that.localCopy[that.playerName].length < 26) {
                    that.localCopy[that.playerName].push({ value: n, selected: false });
                }
                else if (randomNo == 2 && that.localCopy[that.otherPlayerName].length < 26) {
                    that.localCopy[that.otherPlayerName].push({ value: n, selected: false });
                }
                else {
                    if (that.localCopy[that.playerName].length < 26) {
                        that.localCopy[that.playerName].push({ value: n, selected: false });
                    }
                    else {
                        that.localCopy[that.otherPlayerName].push({ value: n, selected: false });
                    }
                }
            });
            if (this.localCopy[this.playerName].length < 26) {
                this.localCopy[this.playerName];
            }
        }
        else {
            this.otherPlayerName = "p1";
        }
        this.syncDB();
        // this.testitem = { name: playerName, cards: [10,9,8,10] };
        //this.player = this.af.database.object('/root/' + playerName.toLowerCase());
        //this.player.set([10,9,8,10]);
    };
    HatAppComponent.prototype.processHangmanData = function () {
        if (!this.localCopy.hang.movie1) {
            this.localCopy.hang.movie1 = ["X"];
        }
        if (!this.localCopy.hang.movie2) {
            this.localCopy.hang.movie2 = ["X"];
        }
        this.localCopy.hang.isMovie1GameOver = this.localCopy.hang.isMovie1GameOver;
        this.localCopy.hang.isMovie2GameOver = this.localCopy.hang.isMovie2GameOver;
        if (this.localCopy.hang.movie1.length > 1) {
            this.movie1Entered = true;
        }
        if (this.localCopy.hang.movie2.length > 1) {
            this.movie2Entered = true;
        }
    };
    HatAppComponent.prototype.resetGame = function () {
        this.localCopy = {
            "hang": {
                "isMovie1GameOver": false,
                "isMovie2GameOver": false,
                "isMovie1success": false,
                "isMovie2success": false,
                "movie1string": "X",
                "movie2string": "X",
                "movie1": ["X"],
                "score1": 0,
                "movie1state": ["X"],
                "movie2state": ["X"],
                "movie2": ["X"],
                "score2": 0
            },
            cardCache: [],
            whoPassed: "",
            "winnerName": "",
            "resetState": true,
            "p1": ["X"],
            "p2": ["X"],
            "turnCards": ["X"],
            "playAs": "",
            "whoseTurn": "p1",
            "cardOptions": this.cardOptions
        };
        this.syncDB();
        this.gameStarted = false;
        this.challengeState = false;
    };
    HatAppComponent.prototype.cardOptionClicked = function (card) {
        if (this.myTurn && !this.challengeState) {
            if (!this.challengeAddMoreState) {
                if (!card.selected) {
                    this.localCopy.playAs = card.value;
                    this.localCopy.cardOptions.forEach(function (n) { return n.selected = false; });
                    card.selected = true;
                }
                else {
                    // if (index > -1) {
                    this.localCopy.playAs = null;
                    //}
                    card.selected = false;
                }
            }
        }
    };
    HatAppComponent.prototype.executeChance = function () {
        this.localCopy.resetState = false;
        this.localCopy.whoseTurn == "p1" ? this.localCopy.whoseTurn = "p2" : this.localCopy.whoseTurn = "p1";
        this.localCopy[this.playerName] = this.localCopy[this.playerName].filter(function (n) { return n.selected == false; });
        this.syncDB();
    };
    HatAppComponent.prototype.cardForChallengeClicked = function (card) {
        console.log(card);
    };
    HatAppComponent.prototype.challengeAddMore = function () {
        // add current turnCards to cache
        this.gameOverCheck();
        if (!this.localCopy.cardCache) {
            this.localCopy.cardCache = [];
        }
        this.localCopy.cardCache = this.localCopy.cardCache.concat(this.localCopy.turnCards);
        this.localCopy.turnCards = ["X"];
        this.challengeState = false;
        this.challengeAddMoreState = true;
    };
    HatAppComponent.prototype.challengePass = function () {
        // the opponent can now add more cards OR close the round
        //I can only pass or challenge from next time
        this.gameOverCheck();
        this.challengeState = false;
        this.localCopy.whoPassed = this.playerName;
        if (!this.localCopy.cardCache) {
            this.localCopy.cardCache = [];
        }
        this.localCopy.cardCache = this.localCopy.cardCache.concat(this.localCopy.turnCards);
        this.localCopy.turnCards = ["X"];
        this.localCopy.whoseTurn = this.otherPlayerName;
        this.syncDB();
    };
    HatAppComponent.prototype.roundComplete = function () {
        //discard the cache and reset the whoPassed
        this.localCopy.whoPassed = "";
        this.localCopy.cardCache = [];
        this.challengeState = false;
        this.challengeAddMoreState = false;
        this.localCopy.turnCards = ["X"];
        this.localCopy.whoseTurn = this.playerName;
        this.syncDB();
    };
    HatAppComponent.prototype.gameOverCheck = function () {
        if (this.localCopy[this.otherPlayerName].length == 0) {
            //other player won
            this.localCopy.winnerName = this.otherPlayerName;
            this.syncDB();
            return true;
        }
        else {
            return false;
        }
    };
    HatAppComponent.prototype.challengeYes = function () {
        var fraud = false;
        var that = this;
        this.localCopy.turnCards.forEach(function (n) {
            if (!fraud) {
                if (n != that.localCopy.playAs) {
                    fraud = true;
                }
            }
        });
        if (!fraud) {
            //no fraud
            if (!this.gameOverCheck()) {
                if (this.localCopy.whoPassed != "") {
                    this.localCopy.cardCache.forEach(function (n) {
                        that.localCopy[that.playerName].push({ value: n, selected: false });
                    });
                }
                this.localCopy.turnCards.forEach(function (n) {
                    that.localCopy[that.playerName].push({ value: n, selected: false });
                });
                this.localCopy.whoseTurn = this.otherPlayerName;
            }
        }
        else {
            // if (this.localCopy.whoPassed != "" || this.challengeAddMoreState) {  // if round is old ie whoPassed is not empty
            if (this.localCopy.cardCache) {
                this.localCopy.cardCache.forEach(function (n) {
                    that.localCopy[that.otherPlayerName].push({ value: n, selected: false });
                });
            }
            // }
            that.localCopy.turnCards.forEach(function (n) {
                that.localCopy[that.otherPlayerName].push({ value: n, selected: false });
            });
            this.localCopy.whoseTurn = this.playerName;
        }
        this.localCopy.whoPassed = "";
        this.localCopy.turnCards = ["X"];
        this.challengeState = false;
        this.localCopy.cardCache = [];
        this.challengeAddMoreState = false;
        this.syncDB();
    };
    HatAppComponent.prototype.syncDB = function () {
        this.root.set(this.localCopy);
    };
    HatAppComponent.prototype.cardClicked = function (card) {
        var _this = this;
        if (this.myTurn && !this.challengeState) {
            if (!card.selected) {
                this.localCopy.turnCards.push(card.value);
                card.selected = true;
            }
            else {
                // if (index > -1) {
                this.localCopy.turnCards.splice(this.localCopy.turnCards.indexOf(card.value), 1);
                //}
                card.selected = false;
            }
            if (this.myTurn && this.localCopy.cardCache && this.localCopy.cardCache.length > 0) {
                this.challengeAddMoreState = true;
            }
            if (this.challengeAddMoreState) {
                this.localCopy.cardOptions.forEach(function (n) {
                    if (n.value != _this.localCopy.playAs) {
                        n.selected = false;
                    }
                    else {
                        n.selected = true;
                    }
                });
            }
        }
    };
    HatAppComponent.prototype.save = function (newName) {
        this.item.set({ name: newName });
    };
    HatAppComponent.prototype.update = function (newSize) {
        this.item.update({ size: newSize });
    };
    HatAppComponent.prototype.delete = function () {
        this.item.remove();
    };
    HatAppComponent.prototype.resetHangman = function () {
        this.movie1Entered = false;
        this.movie2Entered = false;
        this.localCopy.hang.movie1string = "";
        this.localCopy.hang.movie2string = "";
        this.resetGame();
    };
    HatAppComponent.prototype.checkHangGameOver = function (movie) {
        //check if won
        var falseCount = 0;
        this.localCopy.hang[movie].forEach(function (m) {
            if (m.show == false) {
                falseCount += 1;
            }
        });
        if (falseCount == 0) {
            this.localCopy.hang.isMovie1success = true;
            this.localCopy.hang.score1 += 1;
            this.localCopy.hang.isMovie1GameOver = true;
        }
        if (!this.localCopy.hang.isMovie1success) {
            //check lost
            var optionsUsedCount = 0;
            var that = this;
            this.localCopy.hang.movie1state.forEach(function (n) {
                if (n.optionUsed == false) {
                    that.localCopy.hang.isMovie1success = false;
                }
                else {
                    optionsUsedCount += 1;
                }
            });
            //check game over
            if (optionsUsedCount == 7) {
                this.localCopy.hang.isMovie1GameOver = true;
                this.localCopy.hang.score1 -= 1;
            }
        }
        this.syncDB();
    };
    HatAppComponent.prototype.option1Clicked = function (card) {
        console.log(card);
        var n = card.valueEntered.toUpperCase();
        if (n == "A" || n == "E" || n == "I" || n == "O" || n == "U") {
            card.valueEntered = "";
            card.optionUsed = false;
        }
        else if (this.localCopy.hang.movie1string.indexOf(n) != -1) {
            //show the letter in movie
            this.localCopy.hang.movie1.forEach(function (m) {
                if (m.value == n) {
                    m.show = true;
                }
            });
            card.valueEntered = "";
            card.optionUsed = false;
        }
        else {
            card.valueEntered = n;
            card.optionUsed = true;
        }
        this.checkHangGameOver("movie1");
    };
    HatAppComponent.prototype.startHangman1 = function (value) {
        this.localCopy.hang.isMovie1success = false;
        this.localCopy.hang.isMovie1GameOver = false;
        this.localCopy.hang.movie1string = value.toUpperCase();
        var movie1 = [];
        //var that = this;
        //that.localCopy.hang.movie1 = [];
        value.toUpperCase().split('').forEach(function (n) {
            if (n == "A" || n == "E" || n == "I" || n == "O" || n == "U" || n == " ") {
                movie1.push({ "value": n, "show": true });
            }
            else {
                //console.log(n);
                movie1.push({ "value": n, "show": false });
            }
        });
        this.localCopy.hang.movie1 = movie1;
        this.movie1Entered = true;
        var movie1state = [];
        "hangman".toUpperCase().split('').forEach(function (n) {
            movie1state.push({ "placeHolder": n, "optionUsed": false, "valueEntered": "" });
        });
        this.localCopy.hang.movie1state = movie1state;
        this.syncDB();
    };
    //2nd player hangman
    HatAppComponent.prototype.checkHangGameOver2 = function (movie) {
        //check if won
        var falseCount = 0;
        this.localCopy.hang[movie].forEach(function (m) {
            if (m.show == false) {
                falseCount += 1;
            }
        });
        if (falseCount == 0) {
            this.localCopy.hang.isMovie2success = true;
            this.localCopy.hang.score2 += 1;
            this.localCopy.hang.isMovie2GameOver = true;
        }
        if (!this.localCopy.hang.isMovie2success) {
            //check lost
            var optionsUsedCount = 0;
            var that = this;
            this.localCopy.hang.movie2state.forEach(function (n) {
                if (n.optionUsed == false) {
                    that.localCopy.hang.isMovie2success = false;
                }
                else {
                    optionsUsedCount += 1;
                }
            });
            //check game over
            if (optionsUsedCount == 7) {
                this.localCopy.hang.isMovie2GameOver = true;
                this.localCopy.hang.score2 -= 1;
            }
        }
        this.syncDB();
    };
    HatAppComponent.prototype.option2Clicked = function (card) {
        console.log(card);
        var n = card.valueEntered.toUpperCase();
        if (n == "A" || n == "E" || n == "I" || n == "O" || n == "U") {
            card.valueEntered = "";
            card.optionUsed = false;
        }
        else if (this.localCopy.hang.movie2string.indexOf(n) != -1) {
            //show the letter in movie
            this.localCopy.hang.movie2.forEach(function (m) {
                if (m.value == n) {
                    m.show = true;
                }
            });
            card.valueEntered = "";
            card.optionUsed = false;
        }
        else {
            card.valueEntered = n;
            card.optionUsed = true;
        }
        this.checkHangGameOver2("movie2");
    };
    HatAppComponent.prototype.startHangman2 = function (value) {
        this.localCopy.hang.isMovie2success = false;
        this.localCopy.hang.isMovie2GameOver = false;
        this.localCopy.hang.movie2string = value.toUpperCase();
        var movie2 = [];
        //var that = this;
        //that.localCopy.hang.movie1 = [];
        value.toUpperCase().split('').forEach(function (n) {
            if (n == "A" || n == "E" || n == "I" || n == "O" || n == "U" || n == " ") {
                movie2.push({ "value": n, "show": true });
                //that.localCopy.hang.movie1.push(n);
                //that.localCopy.hang.movie1.push({"value":n, "show":true});
                console.log(n);
            }
            else {
                console.log(n);
                movie2.push({ "value": n, "show": false });
            }
        });
        this.localCopy.hang.movie2 = movie2;
        this.movie2Entered = true;
        var movie2state = [];
        "hangman".toUpperCase().split('').forEach(function (n) {
            movie2state.push({ "placeHolder": n, "optionUsed": false, "valueEntered": "" });
        });
        this.localCopy.hang.movie2state = movie2state;
        this.syncDB();
    };
    HatAppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'hat-app',
            templateUrl: 'hat.component.html',
            styleUrls: ['hat.component.css'],
            directives: [tabs_1.MD_TABS_DIRECTIVES, input_1.MdInput, button_1.MD_BUTTON_DIRECTIVES, card_1.MD_CARD_DIRECTIVES, radio_1.MdRadioGroup, icon_1.MdIcon, toolbar_1.MdToolbar,
                radio_1.MdRadioButton],
            providers: [radio_1.MdRadioDispatcher, icon_1.MdIconRegistry]
        }), 
        __metadata('design:paramtypes', [angularfire2_1.AngularFire, core_1.ApplicationRef])
    ], HatAppComponent);
    return HatAppComponent;
}());
exports.HatAppComponent = HatAppComponent;
//# sourceMappingURL=hat.component.js.map