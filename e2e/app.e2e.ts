import { HatPage } from './app.po';

describe('hat App', function() {
  let page: HatPage;

  beforeEach(() => {
    page = new HatPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('hat works!');
  });
});
