// Import Chai and Sinon for mocking
import { expect } from 'chai';
import sinon from 'sinon';
import { sendResponse } from '../../../utils/helpers/responseHelpers.js';

describe('sendResponse', () => {
  let res;

  // Create a fresh mock response before each test
  beforeEach(() => {
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
      send: sinon.stub(),
      redirect: sinon.stub(),
      setHeader: sinon.stub()
    };
  });

  it('sends 2xx JSON response', () => {
    sendResponse(res, { status: 200, data: { msg: 'ok' } });
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith({ data: { msg: 'ok' } })).to.be.true;
  });

  it('sends buffer directly in 2xx response', () => {
    const buffer = Buffer.from('test');
    sendResponse(res, { status: 200, data: buffer });
    expect(res.send.calledWith(buffer)).to.be.true;
  });

  it('sends 4xx error response', () => {
    sendResponse(res, { status: 400, error: 'Bad input' });
    expect(res.status.calledWith(400)).to.be.true;
    expect(res.json.calledWith({ error: 'Bad input' })).to.be.true;
  });

  it('redirects on 3xx status', () => {
    sendResponse(res, { status: 302, data: '/home' });
    expect(res.redirect.calledWith(302, '/home')).to.be.true;
  });

  it('sets custom headers if provided', () => {
    sendResponse(res, {
      headers: { 'X-Test': 'abc' },
      data: { ok: true }
    });
    expect(res.setHeader.calledWith('X-Test', 'abc')).to.be.true;
  });
});
