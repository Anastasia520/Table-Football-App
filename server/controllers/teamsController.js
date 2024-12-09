const ApiErrorHandler = require("../helpers/ApiErrorHandler/ApiErrorHandler");
const { Team } = require("../models/models");

class TeamsController {
  async create(req, res, next) {
    try {
      const { name, player1_id, player2_id } = req.body;
      const team = await Team.create({ name, player1_id, player2_id });
      return res.json(team);
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

      const teamsData = await Team.findAndCountAll({ limit, offset });

      const pages_count = Math.ceil(teamsData.count / limit);

      const response = {
        count: teamsData.count,
        pages_count,
        current_page: Number(page),
        teams: teamsData.rows,
      };

      return res.json(response);
    } catch (e) {
      next(ApiErrorHandler.badRequest(e.message));
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const team = await Team.findOne({
        where: { id },
      });
      return res.json(team);
    } catch (e) {
      next(ApiErrorHandler.badRequest(e.message));
    }
  }
}

module.exports = new TeamsController();
