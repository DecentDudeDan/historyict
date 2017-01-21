import { FunappPage } from './app.po';

describe('funapp App', function() {
  let page: FunappPage;

  beforeEach(() => {
    page = new FunappPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
