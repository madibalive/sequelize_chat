/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
  const ChannelTwitterProfile = sequelize.define(
    'ChannelTwitterProfile',
    {
      id: {
        type: DataTypes.BIGINT,
        field: 'id',
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      profileId: {
        type: DataTypes.STRING,
        field: 'profile_id',
        allowNull: false
      },
      twitterAccessToken: {
        type: DataTypes.STRING,
        field: 'twitter_access_token',
        allowNull: false
      },
      twitterAccessTokenSecret: {
        type: DataTypes.STRING,
        field: 'twitter_access_token_secret',
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
      tableName: 'channel_twitter_profiles',
      timestamps: false
    }
  );

  ChannelTwitterProfile.associate = models => {};

  return ChannelTwitterProfile;
};

module.exports.initRelations = () => {
  delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
};
