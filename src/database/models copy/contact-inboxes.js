/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
  const ContactInbox = sequelize.define(
    'ContactInbox',
    {
      id: {
        type: DataTypes.BIGINT,
        field: 'id',
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },

      sourceId: {
        type: DataTypes.STRING,
        field: 'source_id',
        allowNull: false
      }
    },
    {
      schema: 'public',
      tableName: 'contact_inboxes',
      timestamps: true
    }
  );

  ContactInbox.associate = models => {
    const Conversation = models.Conversation;
    const Inbox = models.Inbox;
    const Contact = models.Contact;

    // ContactInbox.hasMany(Conversation, {
    //   as: 'Conversation',
    //   foreignKey: 'contact_inbox_id',
    //   // constraints: false
    // });

    // ContactInbox.belongsTo(Inbox, {
    //   as: 'Inbox',
    //   foreignKey: 'inbox_id',
    //   constraints: false
    // });

    // ContactInbox.belongsTo(Contact, {
    //   as: 'Contact',
    //   foreignKey: 'contact_id'
    // });
  };

  ContactInbox.prototype.webhook_data = async function () {
    let conversation = await this.current_conversation();
    // let inbox =await this.getInbox({
    //   include :
    // });

    return {
      id: this.id,
      name: this.name,
      type: 'agent_bot'
    };
  };

  ContactInbox.prototype.current_conversation = async function () {
    // conversations.last
  };

  return ContactInbox;
};
