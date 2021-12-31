export const WEBHOOK_TYPE = {
  account: 0,
  inbox: 1
};

export const CONVERSATION_STATUS = {
  open: 0,
  resolved: 1,
  bot: 2
};
export const AVAILABILITY = {
  online: 0,
  offline: 1,
  busy: 2
};

export const CUSTOMER_STATUS_TYPES = {
  active: 'active',
  dormant: 'dormant',
  inactive: 'inactive'
};

export const MESSAGE_TYPE = { incoming: 0, outgoing: 1, activity: 2, template: 3 };
export const MESSAGE_STATUS = { sent: 0, delivered: 1, read: 2, failed: 3 };
export const CONTENT_TYPE = {
  text: 0,
  input_text: 1,
  input_textarea: 2,
  input_email: 3,
  input_select: 4,
  cards: 5,
  form: 6,
  article: 7,
  incoming_email: 8
};

export const ROLE = { agent: 0, administrator: 1 };
export const AGENT_INBOX_STATUS = {
  active: 0,
  inactive: 1
};

export const FILE_TYPE = {
  image: 'image',
  audio: 'audio',
  video: 'video',
  file: 'file',
  location: 'location',
  fallback: 'fallback'
};

export const NOTIFICATION_TYPES = {
  conversation_creation: 1,
  conversation_assignment: 2
};
