const ApiErrorHandler = require("../helpers/ApiErrorHandler/ApiErrorHandler");
const { Game } = require("../models/models");

class GamesController {
  async create(req, res, next) {
    try {
      const { team1_id, team2_id, status } = req.body;
      const game = await Game.create({ team1_id, team2_id, status });
      return res.json(game);
    } catch (e) {
      next(ApiErrorHandler.badRequest(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const games = await Game.findAll();
      return res.json(games);
    } catch (e) {
      next(ApiErrorHandler.badRequest(e.message));
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const game = await Game.findOne({
        where: { id },
      });

      if (!game) {
        return next(ApiErrorHandler.notFound("Game not found"));
      }

      return res.json(game);
    } catch (e) {
      next(ApiErrorHandler.badRequest(e.message));
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { goals_team1, goals_team2, status } = req.body;

      const game = await Game.findByPk(id);
      if (!game) {
        return next(ApiErrorHandler.notFound("Game not found"));
      }

      await game.update({ goals_team1, goals_team2, status });

      return res.json(game);
    } catch (e) {
      next(ApiErrorHandler.badRequest(e.message));
    }
  }
}

module.exports = new GamesController();
