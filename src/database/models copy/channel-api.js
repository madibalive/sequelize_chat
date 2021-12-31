/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
  const ChannelApi = sequelize.define(
    'ChannelApi',
    {
      id: {
        type: DataTypes.BIGINT,
        field: 'id',
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      accountId: {
        type: DataTypes.INTEGER,
        field: 'account_id',
        allowNull: false
      },
      webhookUrl: {
        type: DataTypes.STRING,
        field: 'webhook_url',
        allowNull: false
      }
    },
    {
      schema: 'public',
      tableName: 'channel_api',
      timestamps: true
    }
  );

  ChannelApi.associate = models => {};

  return ChannelApi;
};

module.exports.initRelations = () => {
  delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
};
