const express = require('express');
const validate = require('../../middlewares/validate');
const chatValidation = require('../../validations/chat.validation');
const chatController = require('../../controllers/chat.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.get('/', validate(chatValidation.getChat), auth(), chatController.getMessages);
router.post('/', validate(chatValidation.sendChatMessage), auth(), chatController.sendMessage);

module.exports = router;


/**
 * @swagger
 * tags:
 *   name: Chat
 *   description: Chat
 */

/**
 * @swagger
 * /chat:
 *   post:
 *     summary: Send a chat message
 *     tags: [Chat]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - to
 *               - message
 *             properties:
 *               to:
 *                 type: string
 *               message:
 *                 type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "204":
 *         description: No content
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /chat:
 *   get:
 *     summary: Get a chat conversation between logged in user and another user
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: otherUserId
 *         schema:
 *           type: string
 *         description: User ID of other user
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *         description: pagination page
*       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by which field and asc or desc. format is field:(asc/dec)
 *     responses:
 *       "204":
 *         description: No content
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */