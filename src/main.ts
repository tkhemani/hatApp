import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { HatAppComponent, environment } from './app/';
import { FIREBASE_PROVIDERS, defaultFirebase } from 'angularfire2';

if (environment.production) {
  enableProdMode();
}

bootstrap(HatAppComponent, [
  FIREBASE_PROVIDERS,
  defaultFirebase('https://hatplay.firebaseio.com')
]);

