import { expect } from 'chai';
import { createExcelWorkbook } from '../../../utils/fileGenerators/templates/excelTemplate.js';
import XLSX from 'xlsx';

describe('createExcelWorkbook', () => {
  it('should create a valid Excel workbook buffer for normal input', () => {
    const summary = { total: 1000, count: 5 };
    const expenses = [
      { id: 1, item: 'Coffee', amount: 5 },
      { id: 2, item: 'Book', amount: 20 },
    ];

    const buffer = createExcelWorkbook(summary, expenses);
    expect(Buffer.isBuffer(buffer)).to.be.true;

    // Check buffer is valid Excel by reading back sheets
    const workbook = XLSX.read(buffer);
    expect(workbook.SheetNames).to.include.members(['Expenses', 'Summary']);
  });

  it('should handle empty expenses and empty summary gracefully', () => {
    const summary = {};
    const expenses = [];

    const buffer = createExcelWorkbook(summary, expenses);
    expect(Buffer.isBuffer(buffer)).to.be.true;

    const workbook = XLSX.read(buffer);
    expect(workbook.SheetNames).to.include.members(['Expenses', 'Summary']);

    // Summary sheet data should include keys with 0 values
    const summarySheet = workbook.Sheets['Summary'];
    const summaryData = XLSX.utils.sheet_to_json(summarySheet, { header: 1 });
    expect(summaryData.length).to.equal(0); // no summary entries
  });

  it('should default null/undefined summary values to 0', () => {
    const summary = { total: null, count: undefined };
    const expenses = [{ id: 1, item: 'Test', amount: 10 }];

    const buffer = createExcelWorkbook(summary, expenses);
    expect(Buffer.isBuffer(buffer)).to.be.true;

    const workbook = XLSX.read(buffer);
    const summarySheet = workbook.Sheets['Summary'];
    const summaryData = XLSX.utils.sheet_to_json(summarySheet, { header: 1 });

    // Summary sheet rows have 0 for null/undefined values
    expect(summaryData).to.deep.include(['total', 0]);
    expect(summaryData).to.deep.include(['count', 0]);
  });
});
