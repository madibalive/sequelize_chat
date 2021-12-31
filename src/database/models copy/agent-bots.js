/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
  const AgentBot = sequelize.define(
    'AgentBot',
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
      description: {
        type: DataTypes.STRING,
        field: 'description',
        allowNull: true
      },
      avatar_url: {
        type: DataTypes.STRING,
        field: 'avatar_url',
        allowNull: true
      },
      outgoingUrl: {
        type: DataTypes.STRING,
        field: 'outgoing_url',
        allowNull: true
      },

      hideInputForBotConversations: {
        type: DataTypes.BOOLEAN,
        field: 'hide_input_for_bot_conversations',
        allowNull: true,
        defaultValue: false
      }
    },
    {
      schema: 'public',
      tableName: 'agent_bots',
      timestamps: true
    }
  );

  AgentBot.associate = models => {
    AgentBot.hasMany(models.AgentBotInbox, {
      // as: 'AgentBotInbox',
      foreignKey: 'agent_bot_id'
    });

    AgentBot.belongsToMany(models.Inbox, {
      as: 'TagInbox',
      through: models.AgentBotInbox,
      foreignKey: 'agent_id',
      otherKey: 'inbox_id'
    });

    AgentBot.hasMany(models.Message, {
      as: 'Message',
      foreignKey: 'message_id'
    });
  };

  const push_event_data = async function () {
    let inbox = await this.getTagInbox();
    return {
      id: this.id,
      name: this.name,
      avatar_url: this.avatar_url || inbox & inbox.avatar_url,
      type: 'agent_bot'
    };
  };

  const webhook_data = function () {
    return {
      id: this.id,
      name: this.name,
      type: 'agent_bot'
    };
  };

  AgentBot.prototype.push_event_data = push_event_data;

  AgentBot.prototype.webhook_data = webhook_data;

  return AgentBot;
};

module.exports.initRelations = () => {
  delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
};
