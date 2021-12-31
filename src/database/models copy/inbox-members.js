/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
  const InboxMember = sequelize.define(
    'InboxMember',
    {
      id: {
        type: DataTypes.INTEGER,
        field: 'id',
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      }
    },
    {
      schema: 'public',
      tableName: 'inbox_members',
      timestamps: true
    }
  );

  InboxMember.associate = models => {
    InboxMember.belongsTo(models.User, {
      as: 'User',
      foreignKey: 'user_id'
    });

    InboxMember.belongsTo(models.Inbox, {
      as: 'Inbox',
      foreignKey: 'inbox_id'
    });
  };

  const add_agent_to_round_robin = async function (instance, options) {
    // ::RoundRobin::ManageService.new(inbox: inbox).add_agent_to_queue(user_id)
  };

  const remove_agent_from_round_robin = async function (instance, options) {
    // ::RoundRobin::ManageService.new(inbox: inbox).remove_agent_from_queue(user_id)
  };

  InboxMember.afterCreate = add_agent_to_round_robin;
  InboxMember.afterDestroy = remove_agent_from_round_robin;
  return InboxMember;
};

module.exports.initRelations = () => {
  delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
};
