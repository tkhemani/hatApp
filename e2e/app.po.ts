export class HatPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('hat-app h1')).getText();
  }
}
