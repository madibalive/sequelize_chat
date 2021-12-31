/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define(
    'Event',
    {
      id: {
        type: DataTypes.BIGINT,
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
      value: {
        type: DataTypes.FLOAT(53),
        field: 'value',
        allowNull: true
      },

      inboxId: {
        type: DataTypes.INTEGER,
        field: 'inbox_id',
        allowNull: true
      },
      userId: {
        type: DataTypes.INTEGER,
        field: 'user_id',
        allowNull: true
      },
      conversationId: {
        type: DataTypes.INTEGER,
        field: 'conversation_id',
        allowNull: true
      }
    },
    {
      schema: 'public',
      tableName: 'events',
      timestamps: true
    }
  );


  Event.associate = models => {
    Event.belongsTo(models.Account, {
      as: 'Account',
      foreignKey: 'account_id'
    });
    Event.belongsTo(models.User, {
      as: 'User',
      foreignKey: 'user_id'
    });

    Event.belongsTo(models.Inbox, {
      as: 'Inbox',
      foreignKey: 'inbox_id'
    });

    Event.belongsTo(models.Conversation, {
      as: 'Conversation',
      foreignKey: 'conversation_id',
      constraint: false
    });
  };

  return Event;
};

module.exports.initRelations = () => {
  delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
};
