const ApiErrorHandler = require("../helpers/ApiErrorHandler/ApiErrorHandler");
const { Game } = require("../models/models");

class GamesController {
  async create(req, res, next) {
    try {
      const { name } = req.body;
      const game = await Game.create({ name, team1_id, team2_id, status });
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
      return res.json(game);
    } catch (e) {
      next(ApiErrorHandler.badRequest(e.message));
    }
  }
}

module.exports = new GamesController();
