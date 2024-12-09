const ApiErrorHandler = require("../helpers/ApiErrorHandler/ApiErrorHandler");
const { Player } = require("../models/models");

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
      const players = await Player.findAll();
      return res.json(players);
    } catch (e) {
      next(ApiErrorHandler.badRequest(e.message));
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params;
      const player = await Player.findOne({
        where: { id },
      });
      return res.json(player);
    } catch (e) {
      next(ApiErrorHandler.badRequest(e.message));
    }
  }
}

module.exports = new PlayersController();
