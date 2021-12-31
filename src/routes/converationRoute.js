import express from 'express';
import { multerUploads } from '../utils/multer';
import controller from '../controllers/conversationController';
import protectRoutes from '../middlewares/protectRoute';

const router = express.Router();
// chat
router.post('/', protectRoutes.verifyUser, controller.createChat);
router.delete('/', protectRoutes.verifyUser, controller.deleteConversations);
router.get('/subscriptions', protectRoutes.verifyUser, controller.getMySubscriptions);
router.post('/messages', protectRoutes.verifyUser, controller.createMessage);
router.get('/:conversationid', protectRoutes.verifyUser, controller.getChat);
router.get('/:conversationid/mark-as-read', protectRoutes.verifyUser, controller.markChatAsRead);
router.post('/:conversationid/subscribe', protectRoutes.verifyUser, controller.subscribeToChat);
router.post('/:conversationid/typing',protectRoutes.verifyUser, controller.notifyUserTyping);
// subscriptions

export default router;
