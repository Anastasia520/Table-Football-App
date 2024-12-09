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
      limit = limit || 20;
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

      const pages_count = Math.ceil(playersData.length / limit);
      const paginatedData = playersData.slice(offset, offset + limit);

      const response = {
        count: playersData.length,
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
            where: {
              [Op.or]: [{ player1_id: player.id }, { player2_id: player.id }],
            },
            required: false,
          },
          {
            model: Team,
            as: "team2",
            where: {
              [Op.or]: [{ player1_id: player.id }, { player2_id: player.id }],
            },
            required: false,
          },
        ],
      });

      const statistics = makePlayerStatistics(allGames, player);

      const response = {
        id: player.id,
        name: player.name,
        ...statistics,
      };

      return res.json(response);
    } catch (e) {
      next(ApiErrorHandler.badRequest(e.message));
    }
  }
}

module.exports = new PlayersController();
