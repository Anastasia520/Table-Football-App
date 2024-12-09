const { Op } = require("sequelize");
const ApiErrorHandler = require("../helpers/ApiErrorHandler/ApiErrorHandler");
const { Player, Game, Team } = require("../models/models");

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

      const players = await Player.findAll();

      const playersData = await Promise.all(
        players.map(async (player) => {
          const gamesAsTeam1 = await Game.findAll({
            include: [
              {
                model: Team,
                as: "team1",
                where: {
                  [Op.or]: [
                    { player1_id: player.id },
                    { player2_id: player.id },
                  ],
                },
              },
            ],
          });

          const gamesAsTeam2 = await Game.findAll({
            include: [
              {
                model: Team,
                as: "team2",
                where: {
                  [Op.or]: [
                    { player1_id: player.id },
                    { player2_id: player.id },
                  ],
                },
              },
            ],
          });

          const allGames = [...gamesAsTeam1, ...gamesAsTeam2];
          const gamesPlayed = allGames.length;

          const wins = allGames.filter(
            (game) =>
              ((game.team1?.player1_id === player.id ||
                game.team1?.player2_id === player.id) &&
                game.goals_team1 > game.goals_team2) ||
              ((game.team2?.player1_id === player.id ||
                game.team2?.player2_id === player.id) &&
                game.goals_team2 > game.goals_team1)
          ).length;

          const losses = gamesPlayed - wins;
          const winRatio = gamesPlayed > 0 ? wins / gamesPlayed : 0;

          const goalsFor = allGames.reduce((sum, game) => {
            if (
              game.team1?.player1_id === player.id ||
              game.team1?.player2_id === player.id
            ) {
              return sum + game.goals_team1;
            } else if (
              game.team2?.player1_id === player.id ||
              game.team2?.player2_id === player.id
            ) {
              return sum + game.goals_team2;
            }
            return sum;
          }, 0);

          const goalsAgainst = allGames.reduce((sum, game) => {
            if (
              game.team1?.player1_id === player.id ||
              game.team1?.player2_id === player.id
            ) {
              return sum + game.goals_team2;
            } else if (
              game.team2?.player1_id === player.id ||
              game.team2?.player2_id === player.id
            ) {
              return sum + game.goals_team1;
            }
            return sum;
          }, 0);

          const goalDifference = goalsFor - goalsAgainst;

          return {
            id: player.id,
            name: player.name,
            gamesPlayed,
            wins,
            losses,
            winRatio,
            goalsFor,
            goalsAgainst,
            goalDifference,
          };
        })
      );

      const pages_count = Math.ceil(playersData.length / limit);
      const paginatedData = playersData.slice(offset, offset + limit);

      const response = {
        count: playersData.length,
        pages_count,
        current_page: Number(page),
        players: paginatedData,
      };

      return res.json(response);
    } catch (e) {
      next(ApiErrorHandler.badRequest(e.message));
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;

      const player = await Player.findOne({
        where: { id },
      });

      if (!player) {
        return next(ApiErrorHandler.notFound("Player not found"));
      }

      const gamesAsTeam1 = await Game.findAll({
        include: [
          {
            model: Team,
            as: "team1",
            where: {
              [Op.or]: [{ player1_id: player.id }, { player2_id: player.id }],
            },
          },
        ],
      });

      const gamesAsTeam2 = await Game.findAll({
        include: [
          {
            model: Team,
            as: "team2",
            where: {
              [Op.or]: [{ player1_id: player.id }, { player2_id: player.id }],
            },
          },
        ],
      });

      const allGames = [...gamesAsTeam1, ...gamesAsTeam2];
      const gamesPlayed = allGames.length;

      const wins = allGames.filter(
        (game) =>
          ((game.team1?.player1_id === player.id ||
            game.team1?.player2_id === player.id) &&
            game.goals_team1 > game.goals_team2) ||
          ((game.team2?.player1_id === player.id ||
            game.team2?.player2_id === player.id) &&
            game.goals_team2 > game.goals_team1)
      ).length;

      const losses = gamesPlayed - wins;

      const winRatio = gamesPlayed > 0 ? wins / gamesPlayed : 0;

      const goalsFor = allGames.reduce((sum, game) => {
        if (
          game.team1?.player1_id === player.id ||
          game.team1?.player2_id === player.id
        ) {
          return sum + game.goals_team1;
        } else if (
          game.team2?.player1_id === player.id ||
          game.team2?.player2_id === player.id
        ) {
          return sum + game.goals_team2;
        }
        return sum;
      }, 0);

      const goalsAgainst = allGames.reduce((sum, game) => {
        if (
          game.team1?.player1_id === player.id ||
          game.team1?.player2_id === player.id
        ) {
          return sum + game.goals_team2;
        } else if (
          game.team2?.player1_id === player.id ||
          game.team2?.player2_id === player.id
        ) {
          return sum + game.goals_team1;
        }
        return sum;
      }, 0);

      const goalDifference = goalsFor - goalsAgainst;

      const response = {
        id: player.id,
        name: player.name,
        gamesPlayed,
        wins,
        losses,
        winRatio,
        goalsFor,
        goalsAgainst,
        goalDifference,
      };

      return res.json(response);
    } catch (e) {
      next(ApiErrorHandler.badRequest(e.message));
    }
  }
}

module.exports = new PlayersController();
