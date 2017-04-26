import { AngularTrainsPage } from './app.po';

describe('angular-trains App', () => {
  let page: AngularTrainsPage;

  beforeEach(() => {
    page = new AngularTrainsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
