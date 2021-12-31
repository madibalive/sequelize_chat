/* eslint global-require: "off" */
const model = {};
let initialized = false;

/**
 * Initializes sequelize models and their relations.
 * @param   {Object} sequelize  - Sequelize instance.
 * @returns {Object}            - Sequelize models.
 */
function init(sequelize) {
    delete module.exports.init; // Destroy itself to prevent repeated calls and clash with a model named 'init'.
    initialized = true;
    // Import model files and assign them to `model` object.
    model.ActiveStorageAttachment = sequelize.import('./definition/active-storage-attachments.js');
    model.ActiveStorageBlob = sequelize.import('./definition/active-storage-blobs.js');
    model.Agent = sequelize.import('./definition/agents.js');
    model.AppPackageIntegration = sequelize.import('./definition/app-package-integrations.js');
    model.AppPackage = sequelize.import('./definition/app-packages.js');
    model.AppTranslation = sequelize.import('./definition/app-translations.js');
    model.AppUser = sequelize.import('./definition/app-users.js');
    model.App = sequelize.import('./definition/apps.js');
    model.AppsTranslation = sequelize.import('./definition/apps-translations.js');
    model.ArInternalMetadatum = sequelize.import('./definition/ar-internal-metadata.js');
    model.ArticleCollectionTranslation = sequelize.import('./definition/article-collection-translations.js');
    model.ArticleCollection = sequelize.import('./definition/article-collections.js');
    model.ArticleCollectionsTranslation = sequelize.import('./definition/article-collections-translations.js');
    model.ArticleContentTranslation = sequelize.import('./definition/article-content-translations.js');
    model.ArticleContent = sequelize.import('./definition/article-contents.js');
    model.ArticleContentsTranslation = sequelize.import('./definition/article-contents-translations.js');
    model.ArticleSettingTranslation = sequelize.import('./definition/article-setting-translations.js');
    model.ArticleSetting = sequelize.import('./definition/article-settings.js');
    model.ArticleSettingsTranslation = sequelize.import('./definition/article-settings-translations.js');
    model.ArticleTranslation = sequelize.import('./definition/article-translations.js');
    model.Article = sequelize.import('./definition/articles.js');
    model.ArticlesTranslation = sequelize.import('./definition/articles-translations.js');
    model.AssignmentRule = sequelize.import('./definition/assignment-rules.js');
    model.BotTask = sequelize.import('./definition/bot-tasks.js');
    model.Campaign = sequelize.import('./definition/campaigns.js');
    model.CollectionSectionTranslation = sequelize.import('./definition/collection-section-translations.js');
    model.CollectionSection = sequelize.import('./definition/collection-sections.js');
    model.CollectionSectionsTranslation = sequelize.import('./definition/collection-sections-translations.js');
    model.ConversationChannel = sequelize.import('./definition/conversation-channels.js');
    model.ConversationPartBlock = sequelize.import('./definition/conversation-part-blocks.js');
    model.ConversationPartChannelSource = sequelize.import('./definition/conversation-part-channel-sources.js');
    model.ConversationPartContent = sequelize.import('./definition/conversation-part-contents.js');
    model.ConversationPartEvent = sequelize.import('./definition/conversation-part-events.js');
    model.ConversationPart = sequelize.import('./definition/conversation-parts.js');
    model.ConversationSource = sequelize.import('./definition/conversation-sources.js');
    model.Conversation = sequelize.import('./definition/conversations.js');
    model.Event = sequelize.import('./definition/events.js');
    model.ExternalProfile = sequelize.import('./definition/external-profiles.js');
    model.Metric = sequelize.import('./definition/metrics.js');
    model.OauthAccessGrant = sequelize.import('./definition/oauth-access-grants.js');
    model.OauthAccessToken = sequelize.import('./definition/oauth-access-tokens.js');
    model.OauthApplication = sequelize.import('./definition/oauth-applications.js');
    model.OutgoingWebhook = sequelize.import('./definition/outgoing-webhooks.js');
    model.PreviewCard = sequelize.import('./definition/preview-cards.js');
    model.QuickReply = sequelize.import('./definition/quick-replies.js');
    model.QuickRepliesTranslation = sequelize.import('./definition/quick-replies-translations.js');
    model.QuickReplyTranslation = sequelize.import('./definition/quick-reply-translations.js');
    model.Role = sequelize.import('./definition/roles.js');
    model.SchemaMigration = sequelize.import('./definition/schema-migrations.js');
    model.Segment = sequelize.import('./definition/segments.js');
    model.Tagging = sequelize.import('./definition/taggings.js');
    model.Tag = sequelize.import('./definition/tags.js');
    model.Visit = sequelize.import('./definition/visits.js');

    // All models are initialized. Now connect them with relations.
    require('./definition/active-storage-attachments.js').initRelations();
    require('./definition/active-storage-blobs.js').initRelations();
    require('./definition/agents.js').initRelations();
    require('./definition/app-package-integrations.js').initRelations();
    require('./definition/app-packages.js').initRelations();
    require('./definition/app-translations.js').initRelations();
    require('./definition/app-users.js').initRelations();
    require('./definition/apps.js').initRelations();
    require('./definition/apps-translations.js').initRelations();
    require('./definition/ar-internal-metadata.js').initRelations();
    require('./definition/article-collection-translations.js').initRelations();
    require('./definition/article-collections.js').initRelations();
    require('./definition/article-collections-translations.js').initRelations();
    require('./definition/article-content-translations.js').initRelations();
    require('./definition/article-contents.js').initRelations();
    require('./definition/article-contents-translations.js').initRelations();
    require('./definition/article-setting-translations.js').initRelations();
    require('./definition/article-settings.js').initRelations();
    require('./definition/article-settings-translations.js').initRelations();
    require('./definition/article-translations.js').initRelations();
    require('./definition/articles.js').initRelations();
    require('./definition/articles-translations.js').initRelations();
    require('./definition/assignment-rules.js').initRelations();
    require('./definition/bot-tasks.js').initRelations();
    require('./definition/campaigns.js').initRelations();
    require('./definition/collection-section-translations.js').initRelations();
    require('./definition/collection-sections.js').initRelations();
    require('./definition/collection-sections-translations.js').initRelations();
    require('./definition/conversation-channels.js').initRelations();
    require('./definition/conversation-part-blocks.js').initRelations();
    require('./definition/conversation-part-channel-sources.js').initRelations();
    require('./definition/conversation-part-contents.js').initRelations();
    require('./definition/conversation-part-events.js').initRelations();
    require('./definition/conversation-parts.js').initRelations();
    require('./definition/conversation-sources.js').initRelations();
    require('./definition/conversations.js').initRelations();
    require('./definition/events.js').initRelations();
    require('./definition/external-profiles.js').initRelations();
    require('./definition/metrics.js').initRelations();
    require('./definition/oauth-access-grants.js').initRelations();
    require('./definition/oauth-access-tokens.js').initRelations();
    require('./definition/oauth-applications.js').initRelations();
    require('./definition/outgoing-webhooks.js').initRelations();
    require('./definition/preview-cards.js').initRelations();
    require('./definition/quick-replies.js').initRelations();
    require('./definition/quick-replies-translations.js').initRelations();
    require('./definition/quick-reply-translations.js').initRelations();
    require('./definition/roles.js').initRelations();
    require('./definition/schema-migrations.js').initRelations();
    require('./definition/segments.js').initRelations();
    require('./definition/taggings.js').initRelations();
    require('./definition/tags.js').initRelations();
    require('./definition/visits.js').initRelations();
    return model;
}

// Note: While using this module, DO NOT FORGET FIRST CALL model.init(sequelize). Otherwise you get undefined.
module.exports = model;
module.exports.init = init;
module.exports.isInitialized = initialized;
