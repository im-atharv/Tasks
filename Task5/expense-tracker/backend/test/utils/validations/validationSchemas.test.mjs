// Import required tools
import { expect } from 'chai';
import { exportRequestSchema, exportQuerySchema } from '../../../utils/validations/validationSchemas.js';

describe('Validation Schemas', () => {
  it('validates a correct export request body', () => {
    const input = {
      expenses: [{ desc: 'item', amount: 10, category: 'Needs', date: '2023-01-01' }],
      summary: {
        salary: 500,
        needs: 100,
        wants: 100,
        savings: 100,
        total: 300,
        remaining: 200
      }
    };
    // Should pass without throwing
    expect(() => exportRequestSchema.parse(input)).to.not.throw();
  });

  it('rejects invalid export query type', () => {
    // 'csv' is not a valid type in the schema, should throw
    expect(() => exportQuerySchema.parse({ type: 'csv' })).to.throw();
  });
});
