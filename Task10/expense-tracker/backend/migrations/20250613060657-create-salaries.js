/**
 * Migration: Create 'Salaries' Table
 *
 * Purpose:
 * Defines the structure of the `Salaries` table used to store
 * monthly or one-time salary data for each user.
 *
 * Fields:
 * - id: UUID (Primary Key)
 * - amount: float (salary amount)
 * - userId: string (identifies user; can match MongoDB _id or UUID)
 * - createdAt / updatedAt: timestamp fields for tracking
 */

export async function up(queryInterface, Sequelize) {
  // Create 'Salaries' table with schema definition
  await queryInterface.createTable('Salaries', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4, // Auto-generated UUID
    },
    amount: {
      allowNull: false,
      type: Sequelize.FLOAT, // User's salary amount
    },
    userId: {
      allowNull: false,
      type: Sequelize.STRING, // Foreign key linking salary to a user
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('now'), // Timestamp for record creation
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('now'), // Timestamp for record update
    },
  });
}

export async function down(queryInterface) {
  // 🧹 Rollback: Drop 'Salaries' table
  await queryInterface.dropTable('Salaries');
}
