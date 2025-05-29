// test/setup.mjs

// Force-load all source files for coverage tracking
import '../server.js';
import '../middleware/validateExportData.js';
import '../routes/exportRoutes.js';
import '../utils/fileGenerators/generateFiles.js';
import '../utils/fileGenerators/files/generatePDF.js';
import '../utils/fileGenerators/files/generateExcel.js';
import '../utils/fileGenerators/templates/pdfTemplate.js';
import '../utils/fileGenerators/templates/excelTemplate.js';
import '../utils/helpers/responseHelpers.js';
import '../utils/helpers/setFileHeaders.js';
import '../utils/validations/validationSchemas.js';
