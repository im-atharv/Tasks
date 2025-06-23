/**
 * Migration: Create 'Expenses' Table
 *
 * Purpose:
 * Defines the structure for the `Expenses` table which holds individual
 * expense records linked to a specific user.
 *
 * Fields:
 * - id: UUID (Primary Key)
 * - amount: number (expense amount)
 * - desc: string (description of the expense)
 * - category: ENUM ("Needs", "Wants")
 * - date: string (user-defined expense date)
 * - userId: string (foreign key to user system)
 * - createdAt / updatedAt: timestamps
 */

export async function up(queryInterface, Sequelize) {
  // Create the 'Expenses' table
  await queryInterface.createTable('Expenses', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4, // Auto-generate UUID
    },
    amount: {
      allowNull: false,
      type: Sequelize.FLOAT, // Expense amount
    },
    desc: {
      allowNull: false,
      type: Sequelize.STRING, // Short description of the expense
    },
    category: {
      allowNull: false,
      type: Sequelize.ENUM('Needs', 'Wants'), // Categorized as either Need or Want
    },
    date: {
      allowNull: false,
      type: Sequelize.STRING, // Date (user-input, stored as string)
    },
    userId: {
      allowNull: false,
      type: Sequelize.STRING, // Reference to the user (can be a MongoDB _id or UUID)
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('now'), // Timestamp for creation
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('now'), // Timestamp for last update
    },
  });
}

export async function down(queryInterface) {
  // Rollback: Drop 'Expenses' table
  await queryInterface.dropTable('Expenses');

  // PostgreSQL retains ENUMs after table deletion — must remove manually
  await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Expenses_category";');
}
