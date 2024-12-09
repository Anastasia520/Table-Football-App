const makeTeamStatistics = (allGames, team) => {
  const gamesPlayed = allGames.length;

  const wins = allGames.filter(
    (game) =>
      (game.team1_id === team.id && game.goals_team1 > game.goals_team2) ||
      (game.team2_id === team.id && game.goals_team2 > game.goals_team1)
  ).length;

  const losses = gamesPlayed - wins;
  const winRatio = gamesPlayed > 0 ? wins / gamesPlayed : 0;

  const goalsFor = allGames.reduce(
    (sum, game) =>
      sum + (game.team1_id === team.id ? game.goals_team1 : game.goals_team2),
    0
  );

  const goalsAgainst = allGames.reduce(
    (sum, game) =>
      sum + (game.team1_id === team.id ? game.goals_team2 : game.goals_team1),
    0
  );

  const goalDifference = goalsFor - goalsAgainst;

  return {
    gamesPlayed,
    wins,
    losses,
    winRatio,
    goalsFor,
    goalsAgainst,
    goalDifference,
  };
};

const makePlayerStatistics = (allGames, player) => {
  // Filter only games where the player participated
  const filteredGames = allGames.filter(
    (game) =>
      game.team1?.player1_id === player.id ||
      game.team1?.player2_id === player.id ||
      game.team2?.player1_id === player.id ||
      game.team2?.player2_id === player.id
  );

  const gamesPlayed = filteredGames.length;

  if (gamesPlayed === 0) {
    // Return zero stats if the player hasn't played any games
    return {
      gamesPlayed: 0,
      wins: 0,
      losses: 0,
      winRatio: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
    };
  }

  const wins = filteredGames.filter(
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

  const goalsFor = filteredGames.reduce((sum, game) => {
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

  const goalsAgainst = filteredGames.reduce((sum, game) => {
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
    gamesPlayed,
    wins,
    losses,
    winRatio,
    goalsFor,
    goalsAgainst,
    goalDifference,
  };
};

module.exports = { makeTeamStatistics, makePlayerStatistics };
