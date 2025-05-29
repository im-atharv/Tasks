import { expect } from "chai";
import validateExportRequest from "../../middleware/validateExportData.js";

describe("validateExportRequest Middleware", () => {
  it("should call next() for valid input", (done) => {
    const req = {
      body: {
        expenses: [
          { desc: "Lunch", amount: 10, category: "Needs", date: "2023-01-01" },
        ],
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
});
