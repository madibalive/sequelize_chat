/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
  const TelegramBot = sequelize.define(
    'TelegramBot',
    {
      id: {
        type: DataTypes.INTEGER,
        field: 'id',
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        field: 'name',
        allowNull: true
      },
      authKey: {
        type: DataTypes.STRING,
        field: 'auth_key',
        unique: true,
        allowNull: true
      },

     
    },
    {
      schema: 'public',
      tableName: 'telegram_bots',
      timestamps: false
    }
  );

  TelegramBot.associate = models => {
    TelegramBot.belongsTo(models.Account, {
      as: 'Account',
      foreignKey: 'account_id'
    });
  };

  return TelegramBot;
};
