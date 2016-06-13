"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var core_1 = require('@angular/core');
var _1 = require('./hatApp/app/');
var angularfire2_1 = require('angularfire2');
var http_1 = require('@angular/http');
if (_1.environment.production) {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.bootstrap(_1.HatAppComponent, [
    http_1.HTTP_PROVIDERS,
    angularfire2_1.FIREBASE_PROVIDERS,
    angularfire2_1.defaultFirebase('https://hatplay.firebaseio.com')
]);
//# sourceMappingURL=main.js.map