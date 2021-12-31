/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
  const AgentBotInbox = sequelize.define(
    'AgentBotInbox',
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
        allowNull: true,
        defaultValue: 0
      }
    },
    {
      schema: 'public',
      tableName: 'agent_bot_inboxes',
      timestamps: true
    }
  );

  AgentBotInbox.associate = models => {
    // AgentBotInbox.belongsTo(models.Inbox, {
    //   // as: 'Inbox',
    //   foreignKey: 'inbox_id',
    //   constraints: false
    // });

    // AgentBotInbox.belongsTo(models.AgentBot, {
    //   as: 'AgentBot',
    //   foreignKey: 'agent_bot_id',
    //   constraints: false
    // });
  };

  return AgentBotInbox;
};
