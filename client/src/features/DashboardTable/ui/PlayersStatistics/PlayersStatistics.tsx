import { Paper } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { PlayersStatistics as PlayersStatisticsType } from "../../../../entities/Player";

const columns: GridColDef[] = [
  { field: "name", headerName: "Player", width: 130 },
  { field: "games_played", headerName: "Games Played", width: 130 },
  {
    field: "wins",
    headerName: "Wins",
    type: "number",
  },
  {
    field: "losses",
    headerName: "Losses",
    type: "number",
  },
  {
    field: "win_ratio",
    headerName: "Win Ration",
    type: "number",
  },

  {
    field: "goals_for",
    headerName: "GF",
    type: "number",
  },
  {
    field: "goals_against",
    headerName: "GA",
    type: "number",
  },
  {
    field: "goal_difference",
    headerName: "GF",
    type: "number",
  },
];

const paginationModel = { page: 0, pageSize: 10 };

interface PlayersStatisticsProps {
  statistics?: PlayersStatisticsType | null;
}

export default function PlayersStatistics(props: PlayersStatisticsProps) {
  const { statistics } = props;

  return (
    <Paper sx={{ height: "100", width: "100%" }}>
      <DataGrid
        rows={statistics?.players}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[10]}
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
