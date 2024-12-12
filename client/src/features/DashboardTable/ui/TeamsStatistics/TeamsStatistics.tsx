import { Paper } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { TeamStatistics } from "../../../../entities/Team";

const columns: GridColDef[] = [
  { field: "name", headerName: "Team", width: 130 },
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

interface TeamsStatisticsProps {
  statistics?: TeamStatistics | null;
}

export default function TeamsStatistics(props: TeamsStatisticsProps) {
  const { statistics } = props;

  return (
    <Paper sx={{ height: "100", width: "100%" }}>
      <DataGrid
        rows={statistics?.teams}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[10]}
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
