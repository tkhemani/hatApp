import { Component } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';

@Component({
  moduleId: module.id,
  selector: 'hat-app',
  templateUrl: 'hat.component.html',
  styleUrls: ['hat.component.css'],
  directives: [MD_BUTTON_DIRECTIVES]
})
export class HatAppComponent {
  playerName: string;
  item: FirebaseObjectObservable<any>;
  constructor(af: AngularFire) {
    this.playerName = "";
    this.item = af.database.object('/item');
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
