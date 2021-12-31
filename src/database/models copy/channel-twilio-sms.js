/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
  const ChannelTwilioSm = sequelize.define(
    'ChannelTwilioSm',
    {
      id: {
        type: DataTypes.BIGINT,
        field: 'id',
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      phoneNumber: {
        type: DataTypes.STRING,
        field: 'phone_number',
        allowNull: false
      },
      authToken: {
        type: DataTypes.STRING,
        field: 'auth_token',
        allowNull: false
      },
      accountSid: {
        type: DataTypes.STRING,
        field: 'account_sid',
        allowNull: false
      },
      accountId: {
        type: DataTypes.INTEGER,
        field: 'account_id',
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
      },
      medium: {
        type: DataTypes.INTEGER,
        field: 'medium',
        allowNull: true,
        defaultValue: 0
      }
    },
    {
      schema: 'public',
      tableName: 'channel_twilio_sms',
      timestamps: false
    }
  );

  ChannelTwilioSm.associate = models => {};

  return ChannelTwilioSm;
};

module.exports.initRelations = () => {
  delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
};
