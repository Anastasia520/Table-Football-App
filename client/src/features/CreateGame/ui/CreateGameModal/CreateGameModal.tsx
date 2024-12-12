import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Box,
  Button,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";

import cls from "./CreateGameModal.module.scss";
import { CloseRounded } from "@mui/icons-material";

import {
  DynamicModuleLoader,
  ReducersList,
} from "../../../../shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { createGameReducer } from "../../model/slice/createGameSlice";

import { getTeamsStatisticsData, Team } from "../../../../entities/Team";
import {
  getTeamsStatisticsRequestError,
  getTeamsStatisticsRequestLoading,
} from "../../../DashboardTable";
import { getTeamsStatistics } from "../../../DashboardTable/model/services/getTeamsStatistics/getTeamsStatistics";
import { getCreateGameLoading } from "../../model/selectors/getCreateGameLoading/getCreateGameLoading";
import { getCreateGameError } from "../../model/selectors/getCreateGameError/getCreateGameError";
import { postCreateGame } from "../../model/services/postCreateGame/postCreateGame";
import { gameActions, getGameData } from "../../../../entities/Game";

interface CreatePlayerModalProps {
  open: boolean;
  handleClose: () => void;
}

const initialReducers: ReducersList = {
  createGame: createGameReducer,
};

export default function CreateGameModal(props: CreatePlayerModalProps) {
  const { open, handleClose } = props;

  const dispatch = useDispatch();

  const createGameData = useSelector(getGameData);
  const isLoadingCreateGame = useSelector(getCreateGameLoading);
  const errorCreateGame = useSelector(getCreateGameError);

  const teamsData = useSelector(getTeamsStatisticsData);
  const errorTeams = useSelector(getTeamsStatisticsRequestError);
  const isLoadingTeams = useSelector(getTeamsStatisticsRequestLoading);

  const [teams, setTeams] = useState<Array<Team>>([]);
  const [team1, setTeam1] = useState<Team | null>(null);
  const [team2, setTeam2] = useState<Team | null>(null);

  const handleCreateGame = useCallback(() => {
    dispatch(
      postCreateGame({
        team1_id: String(team1?.id),
        team2_id: team2 ? String(team2?.id) : null,
      })
    );
  }, [dispatch, team1, team2]);

  const handleChangeTeam1 = useCallback(
    (e: SelectChangeEvent<string>) => {
      const player = JSON.parse(e.target.value);
      setTeam1(player as Team);
    },
    [team1]
  );

  const handleChangeTeam2 = useCallback(
    (e: SelectChangeEvent<string>) => {
      const player = JSON.parse(e.target.value);
      setTeam2(player as Team);
    },
    [team2]
  );

  useEffect(() => {
    if (createGameData?.id) {
      setTeam1(null);
      setTeam2(null);
    }
  }, [createGameData]);

  useEffect(() => {
    dispatch(getTeamsStatistics(null));

    return () => {
      dispatch(gameActions.setGameData({ id: "", team1_id: "", team2_id: "" }));
    };
  }, []);

  useEffect(() => {
    if (teamsData) {
      setTeams(teamsData.teamsStatistics?.teams as Array<Team>);
    }
  }, [teamsData]);

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <Modal open={open} onClose={handleClose} className={cls.modal}>
        <Box className={cls.modalContainer}>
          <div className={cls.modalHeader}>
            <Typography fontSize={24}>Create a new game</Typography>
            <div onClick={handleClose}>
              <CloseRounded />
            </div>
          </div>
          {errorCreateGame && <Typography>{errorCreateGame}</Typography>}
          {errorTeams && <Typography>{errorTeams}</Typography>}

          <Select
            required
            value={JSON.stringify(team1) || ""}
            label="Team 1"
            onChange={handleChangeTeam1}
          >
            {teams?.map((team) => (
              <MenuItem key={team.id} value={JSON.stringify(team)}>
                {team.name}
              </MenuItem>
            ))}
          </Select>

          <Select
            value={JSON.stringify(team2) || ""}
            label="Team 2"
            onChange={handleChangeTeam2}
          >
            {teams
              ?.filter((team) => team.id != team1?.id)
              .map((team) => (
                <MenuItem key={team.id} value={JSON.stringify(team)}>
                  {team.name}
                </MenuItem>
              ))}
          </Select>

          <Button
            className={cls.btnCreate}
            variant="contained"
            size="large"
            onClick={handleCreateGame}
            disabled={!team1 || !team2}
          >
            {isLoadingCreateGame ? (
              <Typography>Loading...</Typography>
            ) : (
              <Typography>Create</Typography>
            )}
          </Button>
        </Box>
      </Modal>
    </DynamicModuleLoader>
  );
}
