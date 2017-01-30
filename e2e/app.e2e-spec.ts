import { LpslackpagePage } from './app.po';

describe('lpslackpage App', function() {
  let page: LpslackpagePage;

  beforeEach(() => {
    page = new LpslackpagePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
