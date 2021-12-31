/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
  const CannedResponse = sequelize.define(
    'CannedResponse',
    {
      id: {
        type: DataTypes.INTEGER,
        field: 'id',
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },

      shortCode: {
        type: DataTypes.STRING,
        field: 'short_code',
        allowNull: true
      },
      content: {
        type: DataTypes.TEXT,
        field: 'content',
        allowNull: true
      }
    },
    {
      schema: 'public',
      tableName: 'canned_responses',
      timestamps: true
    }
  );

  CannedResponse.associate = models => {
    CannedResponse.belongsTo(models.Account, {
      as: 'Account',
      foreignKey: 'account_id'
    });
  };

  return CannedResponse;
};

module.exports.initRelations = () => {
  delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
};
