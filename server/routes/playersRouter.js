const Router = require("express");
const playersController = require("../controllers/playersController");
const router = new Router();

/**
 * @swagger
 * tags:
 *   name: Players
 *   description: API for managing players
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Player:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The unique ID of the player
 *         name:
 *           type: string
 *           description: The name of the player
 *       example:
 *         id: "123e4567-e89b-12d3-a456-426614174000"
 *         name: "John Doe"
 *     PlayerStatistics:
 *       type: object
 *       properties:
 *         gamesPlayed:
 *           type: integer
 *           description: Total number of games the player participated in
 *         wins:
 *           type: integer
 *           description: Total number of games the player won
 *         losses:
 *           type: integer
 *           description: Total number of games the player lost
 *         winRatio:
 *           type: number
 *           format: float
 *           description: The win ratio of the player
 *         goalsFor:
 *           type: integer
 *           description: Total goals scored by teams the player was part of
 *         goalsAgainst:
 *           type: integer
 *           description: Total goals scored against teams the player was part of
 *         goalDifference:
 *           type: integer
 *           description: The goal difference for the player
 *       example:
 *         gamesPlayed: 10
 *         wins: 6
 *         losses: 4
 *         winRatio: 0.6
 *         goalsFor: 25
 *         goalsAgainst: 20
 *         goalDifference: 5
 */

/**
 * @swagger
 * /players:
 *   post:
 *     summary: Create a new player
 *     tags: [Players]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Player'
 *     responses:
 *       201:
 *         description: The player was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Player'
 *       400:
 *         description: Bad request
 *
 *   get:
 *     summary: Get all players with their statistics
 *     tags: [Players]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           description: Number of players to return
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           description: Page number for pagination
 *     responses:
 *       200:
 *         description: List of all players with their statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   description: Total number of players
 *                 pages_count:
 *                   type: integer
 *                   description: Total number of pages
 *                 current_page:
 *                   type: integer
 *                   description: Current page number
 *                 players:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         format: uuid
 *                       name:
 *                         type: string
 *                       statistics:
 *                         $ref: '#/components/schemas/PlayerStatistics'
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /players/{id}:
 *   get:
 *     summary: Get a player by ID with their statistics
 *     tags: [Players]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The player ID
 *     responses:
 *       200:
 *         description: Player details with statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                 name:
 *                   type: string
 *                 statistics:
 *                   $ref: '#/components/schemas/PlayerStatistics'
 *       404:
 *         description: Player not found
 */

router.post("/", playersController.create);
router.get("/", playersController.getAll);
router.get("/:id", playersController.getOne);

module.exports = router;
