import { Component } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import {MdInput} from '@angular2-material/input';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MdRadioButton, MdRadioGroup, MdRadioDispatcher} from '@angular2-material/radio';

@Component({
  moduleId: module.id,
  selector: 'hat-app',
  templateUrl: 'hat.component.html',
  styleUrls: ['hat.component.css'],
  directives: [ MdInput, MD_BUTTON_DIRECTIVES, MD_CARD_DIRECTIVES,MdRadioGroup,
    MdRadioButton],
  providers: [MdRadioDispatcher]
})

export class HatAppComponent {

  //heroes = ['Windstorm', 'Bombasto', 'Magneta', 'Tornado'];
  //testitem = { name: "test", cards: [1,2] };
  gameStarted = false;
  item: FirebaseObjectObservable<any>;
 // af = null;
  root = null;
  playerName = "";
 // player = null;
 localCopy = {"hima": ["X"], "tarun": ["X"], "turnCards": ["X"], "playAs": "", "whoseTurn":"tarun"};
  //localCopy = {};
  constructor(af: AngularFire) {
    ;
    console.clear();
    //this.af = af;

    this.root = af.database.object('/root');
    this.root.subscribe(data => this.localCopy = data);
    //this.item = af.database.object('/root/item');
     //this.item.remove();
     //this.startGame()
  }
  
  setPlayer(playerName) {
        this.playerName = playerName;
  }
  startGame() {
    if(this.playerName == "") {
      this.playerName = "tarun";
    }
    this.gameStarted = true;
    this.localCopy[this.playerName] = [{value: 1, selected: false},{value: 2, selected: false},{value: 3, selected: false},{value: 4, selected: false}];
    if(this.playerName == "" || this.playerName =="tarun") {
      this.playerName = "tarun";
          this.localCopy[this.playerName] =  [{value: 5, selected: false},{value: 6, selected: false},{value: 7, selected: false},{value: 8, selected: false}];
    }
  this.root.set(this.localCopy);
 // this.testitem = { name: playerName, cards: [10,9,8,10] };
 //this.player = this.af.database.object('/root/' + playerName.toLowerCase());
 //this.player.set([10,9,8,10]);
  }

  resetGame() {
     this.localCopy = {"hima": ["X"], "tarun": ["X"], "turnCards": ["X"], "playAs": "", "whoseTurn":"tarun"};
     this.root.set(this.localCopy);
     this.gameStarted = false;
  }

  cardClicked(card) {
    if(this.localCopy.whoseTurn == this.playerName) {
      this.localCopy.turnCards.push(card);     
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
