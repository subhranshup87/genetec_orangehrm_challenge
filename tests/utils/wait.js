const { expect } = require('@playwright/test');

const waitFor = {
  element: (locator, state = 'visible', timeout) => locator.waitFor({ state, timeout }),

  text: (locator, expected, options) => expect(locator).toContainText(expected, options),

  url: (page, url, options) => page.waitForURL(url, options),
  
  loadState: (page, state = 'load', options) => page.waitForLoadState(state, options),

  response: (page, urlOrPredicate, options) => page.waitForResponse(urlOrPredicate, options),
};

module.exports = { waitFor };