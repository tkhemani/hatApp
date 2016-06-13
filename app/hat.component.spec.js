"use strict";
var testing_1 = require('@angular/core/testing');
var hat_component_1 = require('../app/hat.component');
testing_1.beforeEachProviders(function () { return [hat_component_1.HatAppComponent]; });
testing_1.describe('App: Hat', function () {
    testing_1.it('should create the app', testing_1.inject([hat_component_1.HatAppComponent], function (app) {
        testing_1.expect(app).toBeTruthy();
    }));
    //   it('should have as title \'hat works!\'',
    //       inject([HatAppComponent], (app: HatAppComponent) => {
    //     expect(app.title).toEqual('hat works!');
    //   }));
});
//# sourceMappingURL=hat.component.spec.js.map