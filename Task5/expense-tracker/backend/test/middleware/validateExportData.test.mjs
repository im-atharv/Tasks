import { expect } from "chai";
import sinon from "sinon";
import validateExportRequest from "../../middleware/validateExportData.js";
import * as validationSchemas from "../../utils/validations/validationSchemas.js";

describe("validateExportRequest Middleware", () => {
  it("should call next() for valid input", (done) => {
    const req = {
      body: {
        expenses: [{ desc: "Lunch", amount: 10, category: "Needs", date: "2023-01-01" }],
        summary: {
          salary: 5000,
          needs: 2000,
          wants: 1000,
          savings: 2000,
          total: 5000,
          remaining: 1000,
        },
      },
      query: { type: "pdf" },
    };

    const res = {
      status: () => res,
      json: () => { },
      setHeader: () => { },
    };

    const next = () => done();

    validateExportRequest(req, res, next);
  });

  it("should return 400 for invalid body (missing expenses)", (done) => {
    const req = {
      body: { summary: {} }, // Missing expenses
      query: { type: "pdf" },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().callsFake((payload) => {
        expect(res.status.calledWith(400)).to.be.true;
        expect(payload).to.have.property("error");
        done();
      }),
    };

    validateExportRequest(req, res, () => { });
  });

  it("should return 400 for invalid query (unsupported type)", (done) => {
    const req = {
      body: {
        expenses: [{ desc: "Lunch", amount: 10, category: "Needs", date: "2023-01-01" }],
        summary: {
          salary: 5000,
          needs: 2000,
          wants: 1000,
          savings: 2000,
          total: 5000,
          remaining: 1000,
        },
      },
      query: { type: "csv" }, // Invalid type
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().callsFake((payload) => {
        expect(res.status.calledWith(400)).to.be.true;
        expect(payload).to.have.property("error");
        done();
      }),
    };

    validateExportRequest(req, res, () => { });
  });

  it("should return 400 for missing summary", (done) => {
    const req = {
      body: {
        expenses: [{ desc: "Lunch", amount: 10, category: "Needs", date: "2023-01-01" }],
      },
      query: { type: "pdf" },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().callsFake((payload) => {
        expect(res.status.calledWith(400)).to.be.true;
        expect(payload).to.have.property("error");
        done();
      }),
    };

    validateExportRequest(req, res, () => { });
  });

  it("should return 400 for empty expenses array", (done) => {
    const req = {
      body: {
        expenses: [], // Invalid: empty array
        summary: {
          salary: 5000,
          needs: 2000,
          wants: 1000,
          savings: 2000,
          total: 5000,
          remaining: 1000,
        },
      },
      query: { type: "excel" },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().callsFake((payload) => {
        expect(res.status.calledWith(400)).to.be.true;
        expect(payload).to.have.property("error");
        done();
      }),
    };

    validateExportRequest(req, res, () => { });
  });

  // ** New test to cover fallback error message branch **
  it("should return 400 with fallback error message if error.errors is missing", () => {
    const req = {
      body: {},
      query: {},
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
      setHeader: sinon.stub(),
    };
    const next = sinon.stub();

    // Stub the parse method to throw an error with no `errors` property
    const originalParse = validationSchemas.exportRequestSchema.parse;
    validationSchemas.exportRequestSchema.parse = () => {
      const err = new Error("Some unknown error");
      throw err; // no err.errors property
    };

    validateExportRequest(req, res, next);

    expect(res.status.calledWith(400)).to.be.true;
    expect(res.json.calledWithMatch({ error: "Invalid input data" })).to.be.true;
    expect(next.called).to.be.false;

    // Restore the original method
    validationSchemas.exportRequestSchema.parse = originalParse;
  });
});
