const ApiErrorHandler = require("../helpers/ApiErrorHandler/ApiErrorHandler");
const { Team } = require("../models/models");

class TeamsController {
  async create(req, res) {
    try {
      const { name } = req.body;
      const team = await Team.create({ name, player1_id, player2_id });
      return res.json(team);
    } catch (e) {
      next(ApiErrorHandler.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    try {
      const teams = await Team.findAll();
      return res.json(teams);
    } catch (e) {
      next(ApiErrorHandler.badRequest(e.message));
    }
  }

  async getOne(req, res) {
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
