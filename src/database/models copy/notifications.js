/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define(
    'Notification',
    {
      id: {
        type: DataTypes.BIGINT,
        field: 'id',
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },

      notificationType: {
        type: DataTypes.INTEGER,
        field: 'notification_type',
        allowNull: false
      },
      primaryActorType: {
        type: DataTypes.STRING,
        field: 'primary_actor_type',
        allowNull: false
      },
      primaryActorId: {
        type: DataTypes.BIGINT,
        field: 'primary_actor_id',
        allowNull: false
      },
      secondaryActorType: {
        type: DataTypes.STRING,
        field: 'secondary_actor_type',
        allowNull: true
      },
      secondaryActorId: {
        type: DataTypes.BIGINT,
        field: 'secondary_actor_id',
        allowNull: true
      },
      readAt: {
        type: DataTypes.DATE,
        field: 'read_at',
        allowNull: true
      }
    },
    {
      schema: 'public',
      tableName: 'notifications',
      timestamps: true
    }
  );

  Notification.associate = models => {
    Notification.belongsTo(models.Account, {
      as: 'Account',
      foreignKey: 'account_id'
    });

    Notification.belongsTo(models.User, {
      as: 'User',
      foreignKey: 'user_id'
    });

    Notification.belongsTo(models.Conversation, {
      as: 'PrimaryActor',
      foreignKey: 'primary_actor_id'
    });
  };
  const push_event_data = async function () {
    let user = await this.getUser();
    return {
      id: this.id,
      notification_type: this.notification_type,
      primary_actor_type: this.primary_actor_type,
      primary_actor_id: this.primary_actor_id,
      // primary_actor: this.primary_actor&.push_event_data,
      read_at: this.read_at,
      // secondary_actor: this.secondary_actor&.push_event_data,
      user: await user.push_event_data(),
      created_at: this.created_at,
      account_id: this.account_id
    };
  };
  Notification.prototype.push_message_title = async function () {
    let primary_actor = await this.getPrimaryActor();
    if (this.notification_type == 'conversation_creation')
      return `A new conversation [ID -${primary_actor.id}] has been created in ${primary_actor.inbox.name}`;
    if (this.notification_type == 'conversation_assignment') return `A new conversation [ID -${primary_actor.id}] has been assigned to you.`;
  };

  Notification.prototype.push_event_data = push_event_data;

  const process_notification_delivery = async function (conversation, options) {
    // Notification::PushNotificationJob.perform_later(self)
    // # Queuing after 2 minutes so that we won't send emails for read notifications
    // Notification::EmailNotificationJob.set(wait: 2.minutes).perform_later(self)
  };

  Notification.afterCreate(process_notification_delivery);

  return Notification;
};

module.exports.initRelations = () => {
  delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
};
