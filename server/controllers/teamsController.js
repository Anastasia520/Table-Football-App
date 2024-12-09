const { Team } = require("../models/models");

class TeamsController {
  async create(req, res) {
    const { name } = req.body;
    const team = await Team.create({ name, player1_id, player2_id });
    return res.json(team);
  }

  async getAll(req, res) {
    const teams = await Team.findAll();
    return res.json(teams);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const team = await Team.findOne({
      where: { id },
    });
    return res.json(team);
  }
}

module.exports = new TeamsController();
