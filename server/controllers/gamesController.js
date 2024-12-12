const ApiErrorHandler = require("../helpers/ApiErrorHandler/ApiErrorHandler");
const { Game, Team } = require("../models/models");

class GamesController {
  async create(req, res, next) {
    try {
      const { team1_id, team2_id, status } = req.body;

      const game = await Game.create({ team1_id, team2_id, status });

      const fullGame = await Game.findOne({
        where: { id: game.id },
        include: [
          {
            model: Team,
            as: "team1",
            attributes: ["id", "name"],
          },
          {
            model: Team,
            as: "team2",
            attributes: ["id", "name"],
          },
        ],
      });

      const response = {
        id: fullGame.id,
        goals_team1: fullGame.goals_team1,
        goals_team2: fullGame.goals_team2,
        status: fullGame.status,
        team1_id: fullGame.team1
          ? { id: fullGame.team1.id, name: fullGame.team1.name }
          : null,
        team2_id: fullGame.team2
          ? { id: fullGame.team2.id, name: fullGame.team2.name }
          : null,
        updatedAt: fullGame.updatedAt,
        createdAt: fullGame.createdAt,
        completed_at: fullGame.completed_at,
      };

      return res.json(response);
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
        include: [
          {
            model: Team,
            as: "team1",
            attributes: ["id", "name"],
          },
          {
            model: Team,
            as: "team2",
            attributes: ["id", "name"],
          },
        ],
      });

      if (!game) {
        return next(ApiErrorHandler.notFound("Game not found"));
      }

      const formattedGame = {
        id: game.id,
        goals_team1: game.goals_team1,
        goals_team2: game.goals_team2,
        status: game.status,
        team1_id: {
          id: game.team1?.id || null,
          name: game.team1?.name || "",
        },
        team2_id: {
          id: game.team2?.id || null,
          name: game.team2?.name || "",
        },
        updatedAt: game.updatedAt,
        createdAt: game.createdAt,
        completed_at: game.completed_at,
      };

      return res.json(formattedGame);
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

      if (game.status === "completed") {
        return next(
          ApiErrorHandler.notFound(
            "Game is completed! You can't update it anymore"
          )
        );
      }

      await game.update({ goals_team1, goals_team2, status });

      let gameUpd = await Game.findOne({
        where: { id },
        include: [
          {
            model: Team,
            as: "team1",
            attributes: ["id", "name"],
          },
          {
            model: Team,
            as: "team2",
            attributes: ["id", "name"],
          },
        ],
      });

      const formattedGame = {
        id: gameUpd.id,
        goals_team1: gameUpd.goals_team1,
        goals_team2: gameUpd.goals_team2,
        status: gameUpd.status,
        team1_id: {
          id: gameUpd.team1?.id || null,
          name: gameUpd.team1?.name || "",
        },
        team2_id: {
          id: gameUpd.team2?.id || null,
          name: gameUpd.team2?.name || "",
        },
        updatedAt: gameUpd.updatedAt,
        createdAt: gameUpd.createdAt,
        completed_at: gameUpd.completed_at,
      };

      return res.json(formattedGame);
    } catch (e) {
      next(ApiErrorHandler.badRequest(e.message));
    }
  }
}

module.exports = new GamesController();
