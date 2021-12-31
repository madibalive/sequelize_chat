/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
  const ChannelEmail = sequelize.define(
    'ChannelEmail',
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
      email: {
        type: DataTypes.STRING,
        field: 'email',
        allowNull: false
      },
      forwardToAddress: {
        type: DataTypes.STRING,
        field: 'forward_to_address',
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at',
        allowNull: false
      }
    },
    {
      schema: 'public',
      tableName: 'channel_email',
      timestamps: false
    }
  );

  ChannelEmail.associate = models => {};

  return ChannelEmail;
};

module.exports.initRelations = () => {
  delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
};
