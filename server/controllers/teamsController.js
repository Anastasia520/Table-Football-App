const { Op } = require("sequelize");
const ApiErrorHandler = require("../helpers/ApiErrorHandler/ApiErrorHandler");
const { Team, Game, Player } = require("../models/models");
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
      limit = limit || 200;
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

      const sortedTeams = teamsData.sort((a, b) => {
        if (b.win_ratio !== a.win_ratio) {
          return b.win_ratio - a.win_ratio;
        }
        return b.goal_difference - a.goal_difference;
      });

      const pages_count = Math.ceil(sortedTeams.length / limit);
      const paginatedData = sortedTeams.slice(offset, offset + limit);

      const response = {
        count: sortedTeams.length,
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
        include: [
          {
            model: Player,
            as: "player1",
          },
          {
            model: Player,
            as: "player2",
          },
        ],
      });

      if (!team) {
        return next(ApiErrorHandler.notFound("Team not found"));
      }

      const allGames = await Game.findAll({
        where: {
          [Op.or]: [{ team1_id: team.id }, { team2_id: team.id }],
        },
        include: [
          {
            model: Team,
            as: "team1",
            include: [
              {
                model: Player,
                as: "player1",
              },
              {
                model: Player,
                as: "player2",
              },
            ],
          },
          {
            model: Team,
            as: "team2",
            include: [
              {
                model: Player,
                as: "player1",
              },
              {
                model: Player,
                as: "player2",
              },
            ],
          },
        ],
      });

      const processedGames = allGames.map((game) => ({
        id: game.id,
        team1_id: {
          id: game.team1 ? game.team1.id : null,
          name: game.team1 ? game.team1.name : "",
          goals_team: game.goals_team1,
          player_1:
            game.team1 && game.team1.player1
              ? { id: game.team1.player1.id, name: game.team1.player1.name }
              : null,
          player_2:
            game.team1 && game.team1.player2
              ? { id: game.team1.player2.id, name: game.team1.player2.name }
              : null,
        },
        team2_id: {
          id: game.team2 ? game.team2.id : null,
          name: game.team2 ? game.team2.name : "",
          goals_team: game.goals_team2,
          player_1:
            game.team2 && game.team2.player1
              ? { id: game.team2.player1.id, name: game.team2.player1.name }
              : null,
          player_2:
            game.team2 && game.team2.player2
              ? { id: game.team2.player2.id, name: game.team2.player2.name }
              : null,
        },
        status: game.status,
        completed_at: game.completed_at,
        createdAt: game.createdAt,
        updatedAt: game.updatedAt,
      }));

      const response = {
        id: team.id,
        name: team.name,
        player_1: team.player1
          ? { id: team.player1.id, name: team.player1.name }
          : null,
        player_2: team.player2
          ? { id: team.player2.id, name: team.player2.name }
          : null,
        games: processedGames,
        ...makeTeamStatistics(allGames, team),
      };

      return res.json(response);
    } catch (e) {
      next(ApiErrorHandler.badRequest(e.message));
    }
  }
}

module.exports = new TeamsController();
