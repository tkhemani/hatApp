import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { HatAppComponent, environment } from './app/';
import { FIREBASE_PROVIDERS, defaultFirebase } from 'angularfire2';
import { HTTP_PROVIDERS } from '@angular/http';

if (environment.production) {
  enableProdMode();
}

//noinspection TypeScriptValidateTypes
bootstrap(HatAppComponent, [
  HTTP_PROVIDERS,
  FIREBASE_PROVIDERS,
  defaultFirebase({
    apiKey: "uuiXDBcfoae3cuvuLGBTRXQk2ex6WBYzgkqIcvEU",
    authDomain: null,
    databaseURL: "https://hatplay.firebaseio.com",
    storageBucket: null,
  })
]);

