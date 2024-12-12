const { Op } = require("sequelize");
const ApiErrorHandler = require("../helpers/ApiErrorHandler/ApiErrorHandler");
const { Player, Game, Team } = require("../models/models");
const {
  makePlayerStatistics,
} = require("../helpers/MakeStatatistics/MakeStatistics");

class PlayersController {
  async create(req, res, next) {
    try {
      const { name } = req.body;
      const player = await Player.create({ name });
      return res.json(player);
    } catch (e) {
      next(ApiErrorHandler.badRequest(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      let { limit, page } = req.query;
      page = page || 1;
      limit = limit || 10;
      let offset = page * limit - limit;

      const players = await Player.findAll();

      const playersData = await Promise.all(
        players.map(async (player) => {
          const allGames = await Game.findAll({
            include: [
              {
                model: Team,
                as: "team1",
                where: {
                  [Op.or]: [
                    { player1_id: player.id },
                    { player2_id: player.id },
                  ],
                },
                required: false,
              },
              {
                model: Team,
                as: "team2",
                where: {
                  [Op.or]: [
                    { player1_id: player.id },
                    { player2_id: player.id },
                  ],
                },
                required: false,
              },
            ],
          });

          const statistics = makePlayerStatistics(allGames, player);

          return {
            id: player.id,
            name: player.name,
            ...statistics,
          };
        })
      );

      const sortedPlayers = playersData.sort((a, b) => {
        if (b.win_ratio !== a.win_ratio) {
          return b.win_ratio - a.win_ratio;
        }
        return b.goal_difference - a.goal_difference;
      });

      const pages_count = Math.ceil(sortedPlayers.length / limit);
      const paginatedData = sortedPlayers.slice(offset, offset + limit);

      const response = {
        count: sortedPlayers.length,
        pages_count,
        current_page: Number(page),
        players: paginatedData,
      };

      return res.json(response);
    } catch (e) {
      next(ApiErrorHandler.badRequest(e.message));
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;

      const player = await Player.findOne({
        where: { id },
      });

      if (!player) {
        return next(ApiErrorHandler.notFound("Player not found"));
      }

      const allGames = await Game.findAll({
        include: [
          {
            model: Team,
            as: "team1",
            required: false,
          },
          {
            model: Team,
            as: "team2",
            required: false,
          },
        ],
      });

      const processedGames = allGames.map((game) => {
        const isPlayerInTeam1 =
          game.team1 &&
          (game.team1.player1_id === player.id ||
            game.team1.player2_id === player.id);

        return {
          id: game.id,
          team1_id: {
            id: game.team1 ? game.team1.id : null,
            name: game.team1 ? game.team1.name : "",
            goals_team: game.goals_team1,
          },
          team2_id: {
            id: game.team2 ? game.team2.id : null,
            name: game.team2 ? game.team2.name : "",
            goals_team: game.goals_team2,
          },
          is_players_team1: isPlayerInTeam1,
          status: game.status,
          completed_at: game.completed_at,
          createdAt: game.createdAt,
          updatedAt: game.updatedAt,
        };
      });

      const statistics = makePlayerStatistics(allGames, player);

      const response = {
        id: player.id,
        name: player.name,
        games: processedGames,
        ...statistics,
      };

      return res.json(response);
    } catch (e) {
      next(ApiErrorHandler.badRequest(e.message));
    }
  }
}

module.exports = new PlayersController();
