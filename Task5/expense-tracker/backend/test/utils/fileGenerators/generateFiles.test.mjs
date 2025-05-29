// Import Chai and the function to test
import { expect } from "chai";
import { generateFile } from "../../../utils/fileGenerators/generateFiles.js";

describe("generateFile", function () {
  this.timeout(5000); // Allow up to 5 seconds for file generation

  // Test input data
  const summary = {
    salary: 5000,
    needs: 2000,
    wants: 1000,
    savings: 500,
    total: 3500,
    remaining: 1500,
  };

  const expenses = [
    { desc: "Lunch", amount: 10, category: "Needs", date: "2023-01-01" },
    { desc: "Coffee", amount: 5, category: "Wants", date: "2023-01-02" },
  ];

  it('should generate PDF buffer for type "pdf"', async () => {
    const buffer = await generateFile("pdf", summary, expenses);
    expect(buffer).to.be.instanceOf(Buffer); // should return a Buffer object
  });

  it('should generate Excel buffer for type "excel"', async () => {
    const buffer = await generateFile("excel", summary, expenses);
    expect(buffer).to.be.instanceOf(Buffer); // should return a Buffer object
  });

  it('should throw error for unsupported type', async () => {
    try {
      await generateFile("invalidType", summary, expenses);
      throw new Error("Expected error not thrown"); // This should not run
    } catch (err) {
      expect(err.message).to.include("Unsupported file type"); // error should contain this message
    }
  });
});
