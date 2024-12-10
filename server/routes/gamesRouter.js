const Router = require("express");
const gamesController = require("../controllers/gamesController");
const router = new Router();

/**
 * @swagger
 * tags:
 *   name: Games
 *   description: API for managing games
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Game:
 *       type: object
 *       required:
 *         - team1_id
 *         - team2_id
 *         - status
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The unique ID of the game
 *         team1_id:
 *           type: string
 *           format: uuid
 *           description: The ID of team 1
 *         team2_id:
 *           type: string
 *           format: uuid
 *           description: The ID of team 2
 *         goals_team1:
 *           type: integer
 *           description: Goals scored by team 1
 *           default: 0
 *         goals_team2:
 *           type: integer
 *           description: Goals scored by team 2
 *           default: 0
 *         status:
 *           type: string
 *           enum: ["ongoing", "completed"]
 *           description: The current status of the game
 *           default: "ongoing"
 *         completed_at:
 *           type: string
 *           format: date-time
 *           description: Completion timestamp if the game is completed
 *       example:
 *         id: "123e4567-e89b-12d3-a456-426614174000"
 *         team1_id: "223e4567-e89b-12d3-a456-426614174001"
 *         team2_id: "323e4567-e89b-12d3-a456-426614174002"
 *         goals_team1: 2
 *         goals_team2: 3
 *         status: "completed"
 *         completed_at: "2023-12-09T12:34:56Z"
 */

/**
 * @swagger
 * /games:
 *   get:
 *     summary: Retrieve a list of games
 *     tags: [Games]
 *     responses:
 *       200:
 *         description: List of all games
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Game'
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /games/{id}:
 *   get:
 *     summary: Retrieve a specific game by ID
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The unique ID of the game
 *     responses:
 *       200:
 *         description: Details of the game
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Game'
 *       404:
 *         description: Game not found
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /games:
 *   post:
 *     summary: Create a new game
 *     tags: [Games]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - team1_id
 *               - team2_id
 *               - status
 *             properties:
 *               team1_id:
 *                 type: string
 *                 format: uuid
 *                 description: The ID of team 1
 *               team2_id:
 *                 type: string
 *                 format: uuid
 *                 description: The ID of team 2
 *               status:
 *                 type: string
 *                 enum: ["ongoing", "completed"]
 *                 default: "ongoing"
 *             example:
 *               team1_id: "223e4567-e89b-12d3-a456-426614174001"
 *               team2_id: "323e4567-e89b-12d3-a456-426614174002"
 *               status: "ongoing"
 *     responses:
 *       201:
 *         description: Game created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Game'
 *       400:
 *         description: Validation error or bad request
 */

/**
 * @swagger
 * /games/{id}:
 *   put:
 *     summary: Update a game by ID
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The unique ID of the game
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               goals_team1:
 *                 type: integer
 *                 description: Updated goals scored by team 1
 *               goals_team2:
 *                 type: integer
 *                 description: Updated goals scored by team 2
 *               status:
 *                 type: string
 *                 enum: ["ongoing", "completed"]
 *             example:
 *               goals_team1: 2
 *               goals_team2: 1
 *               status: "completed"
 *     responses:
 *       200:
 *         description: Game updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Game'
 *       404:
 *         description: Game not found
 *       400:
 *         description: Bad request
 */

router.post("/", gamesController.create);
router.get("/", gamesController.getAll);
router.get("/:id", gamesController.getOne);
router.put("/:id", gamesController.update);

module.exports = router;
