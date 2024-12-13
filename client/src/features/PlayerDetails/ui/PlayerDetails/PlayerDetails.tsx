import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import cls from "./PlayerDetails.module.scss";
import { Paper, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { PageLoader } from "../../../../widgets/PageLoader";
import { getPlayerStatisticsData } from "../../../../entities/Player/model/selectors/getPlayerStatisticsData/getPlayerStatisticsData";
import { getPlayerStatisticsRequestError } from "../../model/selectors/getPlayerStatisticsRequestError/getPlayerStatisticsRequestError";
import { getPlayerStatisticsRequestLoading } from "../../model/selectors/getPlayerStatisticsRequestLoading/getPlayerStatisticsRequestLoading";
import { getPlayerStatistics } from "../../model/services/getPlayerStatistics/getPlayerStatistics";
import { TeamGame } from "../../../../entities/Team";
import { useNavigate } from "react-router-dom";

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

export default function PlayerDetails(props: TeamDetailsProps) {
  const { id } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const playerStatisticsData = useSelector(getPlayerStatisticsData);
  const errorPlayerStatistics = useSelector(getPlayerStatisticsRequestError);
  const isLoadingPlayerStatistics = useSelector(
    getPlayerStatisticsRequestLoading
  );

  useEffect(() => {
    dispatch(getPlayerStatistics(id));
  }, [id]);

  const handleGameClick = (e: any) => {
    navigate(`/game/${e.row.id}`);
  };

  return (
    <div className={cls.playerDetailsContainer}>
      {errorPlayerStatistics && (
        <Typography>{errorPlayerStatistics}</Typography>
      )}

      <Typography>{playerStatisticsData.name}</Typography>

      {isLoadingPlayerStatistics ? (
        <PageLoader />
      ) : (
        <>
          <div className={cls.mainStatistic}>
            <Typography>
              Games Played: {playerStatisticsData.games_played}
            </Typography>
            <Typography>
              Goal Difference: {playerStatisticsData.goal_difference}
            </Typography>
            <Typography>
              Goals Against: {playerStatisticsData.goals_against}
            </Typography>
            <Typography>Goals For: {playerStatisticsData.goals_for}</Typography>
            <Typography>Wins: {playerStatisticsData.wins}</Typography>
            <Typography>Losses: {playerStatisticsData.losses}</Typography>
            <Typography>Win Ratio: {playerStatisticsData.win_ratio}</Typography>
          </div>

          <div className={cls.gamesContainer}>
            <Paper sx={{ height: "100", width: "100%" }}>
              <DataGrid
                rows={playerStatisticsData?.games}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[10]}
                sx={{ border: 0 }}
                onRowClick={handleGameClick}
              />
            </Paper>
          </div>
        </>
      )}
    </div>
  );
}
