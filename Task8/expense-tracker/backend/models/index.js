import dotenv from "dotenv";
dotenv.config();

let Expense;
let Salary;

const dbType = process.env.DATABASE_TYPE;

if (dbType === "mongo") {
  // Dynamically import MongoDB models
  import("./MongoDB/Expense.js").then((module) => {
    Expense = module.default;
  });
  import("./MongoDB/SalaryModel.js").then((module) => {
    Salary = module.default;
  });
} else if (dbType === "postgres") {
  // Dynamically import PostgreSQL models
  import("./Postgresql/Expense.js").then((module) => {
    Expense = module.default;
  });
  import("./Postgresql/SalaryModel.js").then((module) => {
    Salary = module.default;
  });
}

export { Expense, Salary };
