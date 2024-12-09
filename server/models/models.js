const sequelize = require("../db");
const { DataTypes } = require("sequelize");

// Player Model
const Player = sequelize.define("Player", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

// Team Model
const Team = sequelize.define("Team", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Team names must be unique
  },
  player1_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Player,
      key: "id",
    },
  },
  player2_id: {
    type: DataTypes.UUID,
    allowNull: true, // Optional for single-player teams
    references: {
      model: Player,
      key: "id",
    },
  },
});

// Custom Validation: Ensure a Team has one or two unique players
Team.addHook("beforeValidate", (team, options) => {
  if (!team.player1_id && !team.player2_id) {
    throw new Error("A team must have at least one player.");
  }
  if (team.player1_id === team.player2_id) {
    throw new Error(
      "A team cannot have the same player assigned to both slots."
    );
  }
});

// Associations
Team.belongsTo(Player, { as: "player1", foreignKey: "player1_id" });
Team.belongsTo(Player, { as: "player2", foreignKey: "player2_id" });

// Game Model
const Game = sequelize.define("Game", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  team1_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Team,
      key: "id",
    },
  },
  team2_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Team,
      key: "id",
    },
  },
  goals_team1: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  goals_team2: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  status: {
    type: DataTypes.ENUM("ongoing", "completed"),
    allowNull: false,
    defaultValue: "ongoing",
  },
  completed_at: {
    type: DataTypes.DATE, // Use DATE for completed timestamp
    allowNull: true,
  },
},
  {
    indexes: [
      {
        unique: true,
        fields: ['team1_id', 'team2_id'], // Ensure teams are unique in a game
      },
    ],
  });

// Associations for Games
Game.belongsTo(Team, { as: "team1", foreignKey: "team1_id" });
Game.belongsTo(Team, { as: "team2", foreignKey: "team2_id" });

// Syncing models to the database
(async () => {
  await sequelize.sync({ alter: true });
})();


module.exports = { Player, Team, Game };