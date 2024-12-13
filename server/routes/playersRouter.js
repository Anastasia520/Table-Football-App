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
 *                   description: The unique ID of the player
 *                   example: "52e291ca-98e2-4cd1-8443-d5301a3e7bbd"
 *                 name:
 *                   type: string
 *                   description: The name of the player
 *                   example: "Lili"
 *                 games:
 *                   type: array
 *                   description: List of games the player participated in
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         format: uuid
 *                         description: The unique ID of the game
 *                         example: "5599caae-b97a-4047-acb8-7a51f76ae87c"
 *                       team1_id:
 *                         type: object
 *                         description: Details of team 1
 *                         properties:
 *                           id:
 *                             type: string
 *                             format: uuid
 *                             description: The unique ID of team 1
 *                             example: "089ff8f2-0daa-4db2-a603-6d4f062a2391"
 *                           name:
 *                             type: string
 *                             description: Name of team 1
 *                             example: "Cutie Kickers"
 *                           goals_team:
 *                             type: integer
 *                             description: Goals scored by this team in the game
 *                             example: 1
 *                       team2_id:
 *                         type: object
 *                         description: Details of team 2
 *                         properties:
 *                           id:
 *                             type: string
 *                             format: uuid
 *                             description: The unique ID of team 2
 *                             example: "ff7e7bad-a08f-4455-b318-62fc9fabde2a"
 *                           name:
 *                             type: string
 *                             description: Name of team 2
 *                             example: "Goal Giggles"
 *                           goals_team:
 *                             type: integer
 *                             description: Goals scored by this team in the game
 *                             example: 6
 *                       is_players_team1:
 *                         type: boolean
 *                         description: Whether the player was in team 1
 *                         example: false
 *                       status:
 *                         type: string
 *                         enum: ["ongoing", "completed"]
 *                         description: The current status of the game
 *                         example: "completed"
 *                       completed_at:
 *                         type: string
 *                         format: date-time
 *                         description: Completion timestamp if the game is completed
 *                         nullable: true
 *                         example: null
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: When the game was created
 *                         example: "2024-12-13T08:28:55.632Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         description: When the game was last updated
 *                         example: "2024-12-13T08:29:06.865Z"
 *                 games_played:
 *                   type: integer
 *                   description: The total number of games played by the player
 *                   example: 7
 *                 wins:
 *                   type: integer
 *                   description: The number of games won by the player's teams
 *                   example: 3
 *                 losses:
 *                   type: integer
 *                   description: The number of games lost by the player's teams
 *                   example: 4
 *                 win_ratio:
 *                   type: number
 *                   format: float
 *                   description: The win ratio of the player
 *                   example: 0.42857142857142855
 *                 goals_for:
 *                   type: integer
 *                   description: The total goals scored by the player's teams
 *                   example: 15
 *                 goals_against:
 *                   type: integer
 *                   description: The total goals conceded by the player's teams
 *                   example: 9
 *                 goal_difference:
 *                   type: integer
 *                   description: The difference between goals scored and goals conceded
 *                   example: 6
 *       404:
 *         description: Player not found
 */

router.post("/", playersController.create);
router.get("/", playersController.getAll);
router.get("/:id", playersController.getOne);

module.exports = router;
