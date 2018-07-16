import { AppPage } from './app.po';

describe('ng-rest-ssr App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome messageTextField', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to benamix!');
  });
});
