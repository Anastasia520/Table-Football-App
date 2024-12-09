const { Game } = require("../models/models");

class GamesController {
  async create(req, res) {
    const { name } = req.body;
    const game = await Game.create({ name, team1_id, team2_id, status });
    return res.json(game);
  }

  async getAll(req, res) {
    const games = await Game.findAll();
    return res.json(games);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const game = await Game.findOne({
      where: { id },
    });
    return res.json(game);
  }
}

module.exports = new GamesController();
