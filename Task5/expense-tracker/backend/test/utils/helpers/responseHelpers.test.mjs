import { expect } from 'chai';
import { sendResponse } from '../../../utils/helpers/responseHelpers.js';

describe('sendResponse', () => {
  let res;

  beforeEach(() => {
    res = {
      statusCode: null,
      headers: {},
      body: null,
      status(code) {
        this.statusCode = code;
        return this;
      },
      setHeader(key, value) {
        this.headers[key] = value;
      },
      json(payload) {
        this.body = payload;
      },
      send(payload) {
        this.body = payload;
      },
      redirect(status, url) {
        this.statusCode = status;
        this.body = `redirect:${url}`;
      }
    };
  });

  it('should set custom headers', () => {
    sendResponse(res, { status: 200, data: { message: 'ok' }, headers: { 'X-Test': 'test-value' } });
    expect(res.headers).to.have.property('X-Test', 'test-value');
  });

  it('should handle 1xx informational response with data', () => {
    sendResponse(res, { status: 100, data: 'info data' });
    expect(res.statusCode).to.equal(100);
    expect(res.body).to.deep.equal({ info: 'info data' });
  });

  it('should handle 1xx informational response with no data', () => {
    sendResponse(res, { status: 101 });
    expect(res.statusCode).to.equal(101);
    expect(res.body).to.deep.equal({ info: 'Informational response' });
  });

  it('should send buffer data for 2xx status', () => {
    const buffer = Buffer.from('test buffer');
    sendResponse(res, { status: 200, data: buffer });
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.equal(buffer);
  });

  it('should send JSON data for 2xx status with non-buffer data', () => {
    sendResponse(res, { status: 200, data: { success: true } });
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.deep.equal({ data: { success: true } });
  });

  it('should redirect for 3xx status with provided location', () => {
    sendResponse(res, { status: 302, data: '/new-location' });
    expect(res.statusCode).to.equal(302);
    expect(res.body).to.equal('redirect:/new-location');
  });

  it('should redirect for 3xx status with default location "/"', () => {
    sendResponse(res, { status: 301 });
    expect(res.statusCode).to.equal(301);
    expect(res.body).to.equal('redirect:/');
  });

  it('should send error JSON for 4xx status with provided error message', () => {
    sendResponse(res, { status: 400, error: 'Bad request' });
    expect(res.statusCode).to.equal(400);
    expect(res.body).to.deep.equal({ error: 'Bad request' });
  });

  it('should send default error JSON for 4xx status with no error message', () => {
    sendResponse(res, { status: 404 });
    expect(res.statusCode).to.equal(404);
    expect(res.body).to.deep.equal({ error: 'Client error occurred' });
  });

  it('should send error JSON for 5xx status with provided error message', () => {
    sendResponse(res, { status: 500, error: 'Server error' });
    expect(res.statusCode).to.equal(500);
    expect(res.body).to.deep.equal({ error: 'Server error' });
  });

  it('should send default error JSON for 5xx status with no error message', () => {
    sendResponse(res, { status: 503 });
    expect(res.statusCode).to.equal(503);
    expect(res.body).to.deep.equal({ error: 'Internal server error' });
  });

  it('should send 500 error JSON for unknown status series', () => {
    sendResponse(res, { status: 700 });
    expect(res.statusCode).to.equal(500);
    expect(res.body).to.deep.equal({ error: 'Unknown status code' });
  });
});
