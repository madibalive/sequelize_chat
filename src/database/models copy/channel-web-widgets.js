/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'ChannelWebWidget',
    {
      id: {
        type: DataTypes.INTEGER,
        field: 'id',
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      websiteUrl: {
        type: DataTypes.STRING,
        field: 'website_url',
        allowNull: true
      },
      accountId: {
        type: DataTypes.INTEGER,
        field: 'account_id',
        allowNull: true
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
      websiteToken: {
        type: DataTypes.STRING,
        field: 'website_token',
        allowNull: true
      },
      widgetColor: {
        type: DataTypes.STRING,
        field: 'widget_color',
        allowNull: true,
        defaultValue: '#1f93ff'
      },
      welcomeTitle: {
        type: DataTypes.STRING,
        field: 'welcome_title',
        allowNull: true
      },
      welcomeTagline: {
        type: DataTypes.STRING,
        field: 'welcome_tagline',
        allowNull: true
      },
      featureFlags: {
        type: DataTypes.INTEGER,
        field: 'feature_flags',
        allowNull: false,
        defaultValue: 3
      }
    },
    {
      schema: 'public',
      tableName: 'channel_web_widgets',
      timestamps: false
    }
  );

  ChannelWebWidget.associate = models => {};

  return ChannelWebWidget;
};
