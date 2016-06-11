import { Component } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import {MdInput} from '@angular2-material/input';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MdRadioButton, MdRadioGroup, MdRadioDispatcher} from '@angular2-material/radio';
import {MdIcon, MdIconRegistry} from '@angular2-material/icon';
import {MdToolbar} from '@angular2-material/toolbar';
//import * as _ from 'lodash';

declare var _:any;

@Component({
  moduleId: module.id,
  selector: 'hat-app',
  templateUrl: 'hat.component.html',
  styleUrls: ['hat.component.css'],
  directives: [ MdInput, MD_BUTTON_DIRECTIVES, MD_CARD_DIRECTIVES,MdRadioGroup,MdIcon,MdToolbar,
    MdRadioButton],
  providers: [MdRadioDispatcher,MdIconRegistry]
})

export class HatAppComponent {

  //heroes = ['Windstorm', 'Bombasto', 'Magneta', 'Tornado'];
  //testitem = { name: "test", cards: [1,2] };
  otherPlayerName = null;
  gameStarted = false;
  challengeState = false;
  myTurn = false;
  item: FirebaseObjectObservable<any>;
  cardOptions = [
{value: "1", selected: false},
{value: "2", selected: false},
{value: "3", selected: false},
{value: "4", selected: false},
{value: "5", selected: false},
{value: "6", selected: false},
{value: "7", selected: false},
{value: "8", selected: false},
{value: "9", selected: false},
{value: "10", selected: false},
{value: "J", selected: false},
{value: "Q", selected: false},
{value: "k", selected: false}
  ]
 // af = null;
  root = null;
  playerName = "";
 // player = null;
 localCopy = {"resetState": false, "p1": ["X"], "p2": ["X"], "turnCards": ["X"], "playAs": "", "whoseTurn":"p1", "cardOptions": this.cardOptions};
  //localCopy = {};
  constructor(af: AngularFire) {
    ;
    console.clear();
    //this.af = af;

    this.root = af.database.object('/root');
    var that = this;
    this.root.subscribe(data => {
      that.localCopy = data;
that.myTurn = (that.localCopy.whoseTurn == that.playerName);
    //that.localCopy.turnCards =
    if(that.myTurn && that.localCopy.turnCards) {
        //  that.localCopy.turnCards.shift();
          if(that.localCopy.turnCards.length >1) {
  that.challengeState = true;
  that.localCopy.turnCards.shift();
}
    }

      });
    //this.item = af.database.object('/root/item');
     //this.item.remove();
     //this.startGame()
  }
  
  setPlayer(playerName) {
        this.playerName = playerName;
  }
  startGame() {
    if(this.playerName == "") {
      this.playerName = "p1";      
    }
    this.gameStarted = true;
    this.localCopy[this.playerName] = [{value: "1", selected: false},{value: "2", selected: false},{value: "3", selected: false},{value: "4", selected: false}];
    if(this.playerName =="p1") {
    //  this.resetGame()
    this.otherPlayerName = "p2";
        this.localCopy[this.playerName] =  [{value: "5", selected: false},{value: "6", selected: false},{value: "7", selected: false},{value: "8", selected: false}];
    }
  this.syncDB();
 // this.testitem = { name: playerName, cards: [10,9,8,10] };
 //this.player = this.af.database.object('/root/' + playerName.toLowerCase());
 //this.player.set([10,9,8,10]);
  }

  resetGame() {    
     this.localCopy = {"resetState": true, "p1": ["X"], "p2": ["X"], "turnCards": ["X"], "playAs": "", "whoseTurn":"p1", "cardOptions": this.cardOptions};
     this.syncDB();
     this.gameStarted = false;
  }
  cardOptionClicked(card) {
 if(this.myTurn) {
       if(!card.selected){
     this.localCopy.playAs = card.value;     
     card.selected = true; 
    } else {
     // if (index > -1) {
    this.localCopy.playAs = null;
//}     
card.selected = false;
    }
    }
  }

  executeChance() {
    this.localCopy.resetState = false;
    this.localCopy.whoseTurn == "p1" ? this.localCopy.whoseTurn = "p2": this.localCopy.whoseTurn = "p1";
    
  this.localCopy[this.playerName] = this.localCopy[this.playerName].filter(n => n.selected == false)
  this.syncDB();
  }

  cardForChallengeClicked(card) {
    console.log(card);
  }

challengeYes(){
var fraud = false; 
var that = this;

this.localCopy.turnCards.forEach(n => {
  if(!fraud) {
   if (n != that.localCopy.playAs) {
    fraud = true;    
  } 
  } 
});

if(!fraud) {
  //no fraud
  this.localCopy.turnCards.forEach(function(n){
  that.localCopy[that.playerName].push({value:n, selected: false});
})
this.localCopy.whoseTurn = this.playerName;
} else {
   that.localCopy.turnCards.forEach(function(n){
  that.localCopy[that.otherPlayerName].push({value:n, selected: false});
})
this.localCopy.whoseTurn = this.otherPlayerName;
this.syncDB();
}
  
}

syncDB() {
  this.root.set(this.localCopy);
}
  cardClicked(card) {
   
    if(this.myTurn) {
       if(!card.selected){
     this.localCopy.turnCards.push(card.value);     
     card.selected = true; 
    } else {
     // if (index > -1) {
    this.localCopy.turnCards.splice(this.localCopy.turnCards.indexOf(card.value), 1);
//}     
card.selected = false;
    }
    }
  }

  save(newName: string) {
    this.item.set({ name: newName });
  }
  
  update(newSize: string) {
    this.item.update({ size: newSize });
  }
  delete() {
    this.item.remove();
  }
}
