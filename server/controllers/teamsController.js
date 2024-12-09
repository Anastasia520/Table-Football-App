const { Op } = require("sequelize");
const ApiErrorHandler = require("../helpers/ApiErrorHandler/ApiErrorHandler");
const { Team, Game } = require("../models/models");
const {
  makeTeamStatistics,
} = require("../helpers/MakeStatatistics/MakeStatistics");

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

      const teams = await Team.findAll();

      const teamsData = await Promise.all(
        teams.map(async (team) => {
          const allGames = await Game.findAll({
            where: {
              [Op.or]: [{ team1_id: team.id }, { team2_id: team.id }],
            },
          });

          const statistics = makeTeamStatistics(allGames, team);

          return {
            id: team.id,
            name: team.name,
            ...statistics,
          };
        })
      );

      const pages_count = Math.ceil(teamsData.length / limit);
      const paginatedData = teamsData.slice(offset, offset + limit);

      const response = {
        count: teamsData.length,
        pages_count,
        current_page: Number(page),
        teams: paginatedData,
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

      if (!team) {
        return next(ApiErrorHandler.notFound("Team not found"));
      }

      const allGames = await Game.findAll({
        where: {
          [Op.or]: [{ team1_id: team.id }, { team2_id: team.id }],
        },
      });

      const statistics = makeTeamStatistics(allGames, team);

      const response = {
        id: team.id,
        name: team.name,
        ...statistics,
      };

      return res.json(response);
    } catch (e) {
      next(ApiErrorHandler.badRequest(e.message));
    }
  }
}

module.exports = new TeamsController();
