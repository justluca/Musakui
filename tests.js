/* eslint-disable arrow-body-style */
/* eslint-disable no-undef */
const { expect } = require('chai');
const musakui = require('./index.js');

describe('Get random posts', () => {
  it('Get post with media', async () => {
    const res = await musakui('aww');
    expect(res).to.have.property('media_url');
  });
  it('Get post without media', async () => {
    const res = await musakui('relationship_advice');
    expect(res).to.not.have.property('media_url');
  });
});
