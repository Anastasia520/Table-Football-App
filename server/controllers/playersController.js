const { Player } = require("../models/models");

class PlayersController {
  async create(req, res) {
    const { name } = req.body;
    const player = await Player.create({ name });
    return res.json(player);
  }

  async getAll(req, res) {
    const players = await Player.findAll();
    return res.json(players);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const player = await Player.findOne({
      where: { id },
    });
    return res.json(player);
  }
}

module.exports = new PlayersController();
