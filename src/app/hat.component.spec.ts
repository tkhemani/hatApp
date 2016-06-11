import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { HatAppComponent } from '../app/hat.component';

beforeEachProviders(() => [HatAppComponent]);

describe('App: Hat', () => {
  it('should create the app',
      inject([HatAppComponent], (app: HatAppComponent) => {
    expect(app).toBeTruthy();
  }));

//   it('should have as title \'hat works!\'',
//       inject([HatAppComponent], (app: HatAppComponent) => {
//     expect(app.title).toEqual('hat works!');
//   }));
});
