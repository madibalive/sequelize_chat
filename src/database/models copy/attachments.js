/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
  const Attachment = sequelize.define(
    'Attachment',
    {
      id: {
        type: DataTypes.INTEGER,
        field: 'id',
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      fileType: {
        type: DataTypes.INTEGER,
        field: 'file_type',
        allowNull: true,
        defaultValue: 0
      },
      externalUrl: {
        type: DataTypes.STRING,
        field: 'external_url',
        allowNull: true
      },
      file_url: {
        type: DataTypes.STRING,
        field: 'external_url',
        allowNull: true
      },
      coordinatesLat: {
        type: DataTypes.FLOAT(53),
        field: 'coordinates_lat',
        allowNull: true,
        defaultValue: 0.0
      },
      coordinatesLong: {
        type: DataTypes.FLOAT(53),
        field: 'coordinates_long',
        allowNull: true,
        defaultValue: 0.0
      },

      fallbackTitle: {
        type: DataTypes.STRING,
        field: 'fallback_title',
        allowNull: true
      },
      extension: {
        type: DataTypes.STRING,
        field: 'extension',
        allowNull: true
      },
      location_metadata: {
        type: DataTypes.JSON,
        get() {
          return {
            coordinates_lat: this.getDataValue(coordinates_lat),
            coordinates_long: this.getDataValue(coordinates_long),
            fallback_title: this.getDataValue(fallback_title),
            data_url: this.getDataValue(external_url)
          };
        }
      },
      file_metadata: {
        type: DataTypes.JSON,
        get() {
          return {
            extension: this.getDataValue(extension),
            thumb_url: this.getDataValue(file_url),
            data_url: this.getDataValue(external_url)
          };
        }
      },
      fallback_data: {
        type: DataTypes.JSON,
        get() {
          return {
            fallback_title: this.getDataValue(fallback_title),
            data_url: this.getDataValue(external_url)
          };
        }
      },
      base_data: {
        type: DataTypes.JSON,
        get() {
          return {
            id: this.getDataValue(id),
            message_id: this.getDataValue(message_id),
            file_type: this.getDataValue(file_type),
            account_id: this.getDataValue(account_id)
          };
        }
      }
    },
    {
      schema: 'public',
      tableName: 'attachments',
      timestamps: true
    }
  );

  Attachment.associate = models => {
    Attachment.belongsTo(models.Account, {
      as: 'Account',
      foreignKey: 'account_id',
      constraint: false
    });
    Attachment.belongsTo(models.Message, {
      as: 'Message',
      foreignKey: 'message_id'
    });
  };

  Attachment.prototype.push_event_data = async function () {
    let inbox = await this.getTagInbox();
    return {
      id: this.id,
      name: this.name,
      avatar_url: this.avatar_url || inbox & inbox.avatar_url,
      type: 'agent_bot'
    };
  };

  return Attachment;
};
