/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
  const Label = sequelize.define(
    'Label',
    {
      id: {
        type: DataTypes.BIGINT,
        field: 'id',
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING,
        field: 'title',
        allowNull: true
      },
      description: {
        type: DataTypes.TEXT,
        field: 'description',
        allowNull: true
      },
      color: {
        type: DataTypes.STRING,
        field: 'color',
        allowNull: false,
        defaultValue: '#1f93ff'
      },
      showOnSidebar: {
        type: DataTypes.BOOLEAN,
        field: 'show_on_sidebar',
        allowNull: true
      }
    },
    {
      schema: 'public',
      tableName: 'labels',
      timestamps: true
    }
  );

  Label.associate = models => {
    Label.belongsTo(models.Account, {
      as: 'Account',
      foreignKey: 'account_id'
    });
  };

  return Label;
};
