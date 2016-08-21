import { FedizIdpUiPage } from './app.po';

describe('fediz-idp-ui App', function() {
  let page: FedizIdpUiPage;

  beforeEach(() => {
    page = new FedizIdpUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
