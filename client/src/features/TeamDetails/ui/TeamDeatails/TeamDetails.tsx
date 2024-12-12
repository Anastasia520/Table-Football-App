import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import cls from "./Teamdetails.module.scss";
import { getTeamStatistics } from "../../model/services/getTeamStatistics/getTeamsStatistics";
import { getTeamStatisticsData, TeamGame } from "../../../../entities/Team";
import { getTeamStatisticsRequestError } from "../../model/selectors/getTeamStatisticsRequestError/getTeamStatisticsRequestError";
import { getTeamStatisticsRequestLoading } from "../../model/selectors/getTeamStatisticsRequestLoading/getTeamStatisticsRequestLoading";
import { Paper, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { PageLoader } from "../../../../widgets/PageLoader";

const columns: GridColDef<TeamGame>[] = [
  {
    field: "team1_id.name",
    headerName: "Team 1",
    width: 150,
    valueGetter: (value, row) => row.team1_id.name,
  },

  {
    field: "team1_id.goals_team",
    headerName: "Team 1 Goals",
    type: "number",
    width: 130,
    valueGetter: (value, row) => row.team1_id?.goals_team,
  },
  {
    field: "team2_id.name",
    headerName: "Team 2",
    width: 150,
    valueGetter: (value, row) => row.team2_id.name,
  },
  {
    field: "team2_id.goals_team",
    headerName: "Team 2 Goals",
    type: "number",
    width: 130,
    valueGetter: (value, row) => row.team2_id?.goals_team,
  },
  {
    field: "status",
    headerName: "Status",
    width: 120,
  },
  // {
  //   field: "createdAt",
  //   headerName: "Created At",
  //   width: 180,
  //   type: "date",
  // },
];

const paginationModel = { page: 0, pageSize: 10 };

interface TeamDetailsProps {
  id: string;
}

export default function TeamDetails(props: TeamDetailsProps) {
  const { id } = props;
  const dispatch = useDispatch();

  const teamStatisticsData = useSelector(getTeamStatisticsData);
  const errorTeamStatistics = useSelector(getTeamStatisticsRequestError);
  const isLoadingTeamStatistics = useSelector(getTeamStatisticsRequestLoading);

  useEffect(() => {
    dispatch(getTeamStatistics(id));
  }, [id]);

  return (
    <div className={cls.teamDetailsContainer}>
      {errorTeamStatistics && <Typography>{errorTeamStatistics}</Typography>}

      <Typography>{teamStatisticsData.name}</Typography>

      {isLoadingTeamStatistics ? <PageLoader /> : <></>}
      <div className={cls.mainStatistic}>
        <Typography>Player 1: {teamStatisticsData.player_1?.name}</Typography>
        <Typography>
          Player 2:{" "}
          {teamStatisticsData.player_2?.name
            ? teamStatisticsData.player_2?.name
            : "-"}
        </Typography>

        <Typography>Games Played: {teamStatisticsData.games_played}</Typography>
        <Typography>
          Goal Difference: {teamStatisticsData.goal_difference}
        </Typography>
        <Typography>
          Goals Against: {teamStatisticsData.goals_against}
        </Typography>
        <Typography>Goals For: {teamStatisticsData.goals_for}</Typography>
        <Typography>Wins: {teamStatisticsData.wins}</Typography>
        <Typography>Losses: {teamStatisticsData.losses}</Typography>
        <Typography>Win Ration: {teamStatisticsData.win_ratio}</Typography>
      </div>

      <div className={cls.gamesContainer}>
        <Paper sx={{ height: "100", width: "100%" }}>
          <DataGrid
            rows={teamStatisticsData?.games}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[10]}
            sx={{ border: 0 }}
          />
        </Paper>
      </div>
    </div>
  );
}
