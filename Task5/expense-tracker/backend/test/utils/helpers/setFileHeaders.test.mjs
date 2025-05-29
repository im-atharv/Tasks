import { expect } from 'chai';
import setFileHeaders from '../../../utils/helpers/setFileHeaders.js';
import sinon from 'sinon';

describe('setFileHeaders', () => {
  let res;

  beforeEach(() => {
    res = { setHeader: sinon.spy() }; // spy to monitor calls
  });

  it('sets headers for pdf type', () => {
    setFileHeaders(res, 'pdf', 'report');
    expect(res.setHeader.calledWith('Content-Type', 'application/pdf')).to.be.true;
    expect(res.setHeader.calledWith('Content-Disposition', 'attachment; filename="report.pdf"')).to.be.true;
  });

  it('sets headers for excel type', () => {
    setFileHeaders(res, 'excel', 'report');
    expect(res.setHeader.calledWith('Content-Type')).to.be.true;
    expect(res.setHeader.calledWith('Content-Disposition')).to.be.true;
  });

  it('throws error for unsupported file type', () => {
    expect(() => setFileHeaders(res, 'csv', 'file')).to.throw('Invalid file type for headers');
  });
});
