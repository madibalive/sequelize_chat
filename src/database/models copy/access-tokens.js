/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
  const AccessToken = sequelize.define(
    'AccessToken',
    {
      id: {
        type: DataTypes.BIGINT,
        field: 'id',
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      ownerType: {
        type: DataTypes.STRING,
        field: 'owner_type',
        allowNull: true
      },
      ownerId: {
        type: DataTypes.BIGINT,
        field: 'owner_id',
        allowNull: true
      },
      token: {
        type: DataTypes.STRING,
        field: 'token',
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
      }
    },
    {
      schema: 'public',
      tableName: 'access_tokens',
      timestamps: false
    }
  );

  AccessToken.associate = models => {};

  return AccessToken;
};
