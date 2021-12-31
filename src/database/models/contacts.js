/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define(
    'Contact',
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
      email: {
        type: DataTypes.STRING,
        field: 'email',
        allowNull: true
      },
      phoneNumber: {
        type: DataTypes.STRING,
        field: 'phone_number',
        allowNull: true
      },

      pubsubToken: {
        type: DataTypes.STRING,
        field: 'pubsub_token',
        allowNull: true
      },
      additionalAttributes: {
        type: DataTypes.JSONB,
        field: 'additional_attributes',
        allowNull: true
      },
      identifier: {
        type: DataTypes.STRING,
        field: 'identifier',
        allowNull: true
      },
      avatarUrl: {
        type: DataTypes.STRING,
        field: 'avatar_url',
        allowNull: true
      }
    },
    {
      schema: 'public',
      tableName: 'contacts',
      timestamps: true
    }
  );

  Contact.associate = models => {
    const Contact = models.Contact;
    const ContactInbox = models.ContactInbox;
    const Inbox = models.Inbox;

    // Contact.belongsTo(models.Account, {
    //   as: 'Account',
    //   foreignKey: 'account_id'
    // });
    Contact.hasMany(models.Subscription, {
      as: 'Subscription',
      foreignKey: 'contact_id'
    });
    Contact.hasMany(models.Conversation, {
      as: 'Connversation',
      foreignKey: 'contact_id'
    });

    Contact.hasMany(models.Message, {
      as: 'sender',
      foreignKey: 'sender_id'
    });

    // Contact.hasMany(ContactInbox, {
    //   foreignKey: 'contact_id'
    // });

    // Contact.belongsToMany(Inbox, {
    //   as: 'ContactInboxInboxes',
    //   through: ContactInbox,
    //   foreignKey: 'contact_id',
    //   otherKey: 'inbox_id'
    // });
  };

  Contact.prototype.push_event_data = async function () {
    let inbox = await this.getTagInbox();
    return {
      id: this.id,
      name: this.name,
      phone_number: this.phone_number,
      identifier: this.identifier,
      pubsub_token: this.pubsub_token,
      thumbnail: this.thumbnail,
      type: 'contact'
    };
  };
  Contact.prototype.webhook_data = function () {
    return {
      id: this.id,
      name: this.name,
      avatar: avatar_url,
      type: 'contact'
    };
  };

  Contact.prototype.get_source_id = async function (inbox_id) {
    // contact_inboxes.find_by!(inbox_id: inbox_id).source_id
  };

  const dispatch_create_event = async function (instance, options) {
    // Rails.configuration.dispatcher.dispatch(CONTACT_CREATED, Time.zone.now, (contact: self));
  };

  const dispatch_update_event = async function (instance, options) {
    // Rails.configuration.dispatcher.dispatch(CONTACT_UPDATED, Time.zone.now, (contact: self));
  };

  Contact.afterCreate(dispatch_create_event);
  Contact.afterUpdate(dispatch_update_event);

  return Contact;
};
