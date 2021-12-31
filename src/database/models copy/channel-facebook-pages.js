/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
  const ChannelFacebookPage = sequelize.define(
    'ChannelFacebookPage',
    {
      id: {
        type: DataTypes.INTEGER,
        field: 'id',
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      pageId: {
        type: DataTypes.STRING,
        field: 'page_id',
        allowNull: false
      },
      userAccessToken: {
        type: DataTypes.STRING,
        field: 'user_access_token',
        allowNull: false
      },
      pageAccessToken: {
        type: DataTypes.STRING,
        field: 'page_access_token',
        allowNull: false
      },
      accountId: {
        type: DataTypes.INTEGER,
        field: 'account_id',
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
      tableName: 'channel_facebook_pages',
      timestamps: false
    }
  );

  ChannelFacebookPage.associate = models => {};

  return ChannelFacebookPage;
};

module.exports.initRelations = () => {
  delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
};
