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
      let { limit, page } = req.query;
      page = page || 1;
      limit = limit || 20;
      let offset = page * limit - limit;

      const playersData = await Player.findAndCountAll({ limit, offset });

      const pages_count = Math.ceil(playersData.count / limit);

      const response = {
        count: playersData.count,
        pages_count,
        current_page: Number(page),
        players: playersData.rows,
      };

      return res.json(response);
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
