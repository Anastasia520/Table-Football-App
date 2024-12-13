const Router = require("express");
const teamsController = require("../controllers/teamsController");
const router = new Router();

/**
 * @swagger
 * tags:
 *   name: Teams
 *   description: API for managing teams
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Team:
 *       type: object
 *       required:
 *         - name
 *         - player1_id
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The unique ID of the team
 *         name:
 *           type: string
 *           description: The name of the team
 *         player1_id:
 *           type: string
 *           format: uuid
 *           description: The ID of the first player
 *         player2_id:
 *           type: string
 *           format: uuid
 *           description: The ID of the second player (optional)
 *       example:
 *         id: "223e4567-e89b-12d3-a456-426614174001"
 *         name: "Team Alpha"
 *         player1_id: "123e4567-e89b-12d3-a456-426614174000"
 *         player2_id: "123e4567-e89b-12d3-a456-426614174002"
 *     TeamStatistics:
 *       type: object
 *       properties:
 *         gamesPlayed:
 *           type: integer
 *           description: Total number of games the team played
 *         wins:
 *           type: integer
 *           description: Total number of games the team won
 *         losses:
 *           type: integer
 *           description: Total number of games the team lost
 *         winRatio:
 *           type: number
 *           format: float
 *           description: The win ratio of the team
 *         goalsFor:
 *           type: integer
 *           description: Total goals scored by the team
 *         goalsAgainst:
 *           type: integer
 *           description: Total goals scored against the team
 *         goalDifference:
 *           type: integer
 *           description: The goal difference for the team
 *       example:
 *         gamesPlayed: 15
 *         wins: 10
 *         losses: 5
 *         winRatio: 0.67
 *         goalsFor: 40
 *         goalsAgainst: 25
 *         goalDifference: 15
 */

/**
 * @swagger
 * /teams:
 *   post:
 *     summary: Create a new team
 *     tags: [Teams]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Team'
 *     responses:
 *       201:
 *         description: The team was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Team'
 *       400:
 *         description: Bad request
 *
 *   get:
 *     summary: Get all teams with their statistics
 *     tags: [Teams]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           description: Number of teams to return
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           description: Page number for pagination
 *     responses:
 *       200:
 *         description: List of all teams with their statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   description: Total number of teams
 *                 pages_count:
 *                   type: integer
 *                   description: Total number of pages
 *                 current_page:
 *                   type: integer
 *                   description: Current page number
 *                 teams:
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
 *                         $ref: '#/components/schemas/TeamStatistics'
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /teams/{id}:
 *   get:
 *     summary: Get a team by ID with their statistics
 *     tags: [Teams]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The team ID
 *     responses:
 *       200:
 *         description: Team details with statistics
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
 *                 player_1:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                     name:
 *                       type: string
 *                 player_2:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                     name:
 *                       type: string
 *                 games:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         format: uuid
 *                       team1_id:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             format: uuid
 *                           name:
 *                             type: string
 *                           goals_team:
 *                             type: integer
 *                           player_1:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: string
 *                                 format: uuid
 *                               name:
 *                                 type: string
 *                           player_2:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: string
 *                                 format: uuid
 *                               name:
 *                                 type: string
 *                       team2_id:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             format: uuid
 *                           name:
 *                             type: string
 *                           goals_team:
 *                             type: integer
 *                           player_1:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: string
 *                                 format: uuid
 *                               name:
 *                                 type: string
 *                           player_2:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: string
 *                                 format: uuid
 *                               name:
 *                                 type: string
 *                       status:
 *                         type: string
 *                       completed_at:
 *                         type: string
 *                         format: date-time
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                 games_played:
 *                   type: integer
 *                 wins:
 *                   type: integer
 *                 losses:
 *                   type: integer
 *                 win_ratio:
 *                   type: number
 *                   format: float
 *                 goals_for:
 *                   type: integer
 *                 goals_against:
 *                   type: integer
 *                 goal_difference:
 *                   type: integer
 *       404:
 *         description: Team not found
 */


router.post("/", teamsController.create);
router.get("/", teamsController.getAll);
router.get("/:id", teamsController.getOne);

module.exports = router;
