/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
  const ActionMailboxInboundEmail = sequelize.define(
    'ActionMailboxInboundEmail',
    {
      id: {
        type: DataTypes.BIGINT,
        field: 'id',
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      status: {
        type: DataTypes.INTEGER,
        field: 'status',
        allowNull: false,
        defaultValue: 0
      },
      messageId: {
        type: DataTypes.STRING,
        field: 'message_id',
        allowNull: false
      },
      messageChecksum: {
        type: DataTypes.STRING,
        field: 'message_checksum',
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
      tableName: 'action_mailbox_inbound_emails',
      timestamps: false
    }
  );

  ActionMailboxInboundEmail.associate = models => {};

  return ActionMailboxInboundEmail;
};

module.exports.initRelations = () => {
  delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
};
