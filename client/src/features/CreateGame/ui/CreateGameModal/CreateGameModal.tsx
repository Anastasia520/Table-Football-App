import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
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
import { PageLoader } from "../../../../widgets/PageLoader";
import { getTeamsStatisticsRequestReducer } from "../../../DashboardTable/model/slice/getTeamsStatisticsSlice";

interface CreatePlayerModalProps {
  open: boolean;
  handleClose: () => void;
}

const initialReducers: ReducersList = {
  createGame: createGameReducer,
  teamsStatisticsRequest: getTeamsStatisticsRequestReducer,
};

export default function CreateGameModal(props: CreatePlayerModalProps) {
  const { open, handleClose } = props;

  const navigate = useNavigate();
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

  const [goalsTeam1, setGoalsTeam1] = useState<number>(0);
  const [goalsTeam2, setGoalsTeam2] = useState<number>(0);

  const [isGameCompleted, setIsGameCompleted] = useState<Boolean>(false);

  const handleCreateGame = useCallback(() => {
    dispatch(
      postCreateGame({
        team1_id: String(team1?.id),
        team2_id: team2 ? String(team2?.id) : null,
        status: isGameCompleted ? "completed" : "ongoing",
        goals_team1: goalsTeam1,
        goals_team2: goalsTeam2,
      })
    );
  }, [dispatch, team1, team2, isGameCompleted, goalsTeam1, goalsTeam2]);

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
      setGoalsTeam1(0);
      setGoalsTeam2(0);
      setIsGameCompleted(false);

      navigate(`/game/${createGameData?.id}`);
    }
  }, [createGameData]);

  useEffect(() => {
    dispatch(getTeamsStatistics());

    return () => {
      dispatch(
        gameActions.setGameData({ id: "", team1_id: null, team2_id: null })
      );
    };
  }, []);

  useEffect(() => {
    if (teamsData) {
      setTeams(teamsData.teamsStatistics?.teams as Array<Team>);
    }
  }, [teamsData]);

  const handleChangeIsGameCompleted = useCallback(() => {
    setIsGameCompleted((prev) => !prev);
  }, [isGameCompleted]);

  const handleChangeTeam1Goals = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (Number(e.target.value) < 0) {
        return;
      }
      setGoalsTeam1(Number(e.target.value));
    },
    [goalsTeam1]
  );

  const handleChangeTeam2Goals = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (Number(e.target.value) < 0) {
        return;
      }
      setGoalsTeam2(Number(e.target.value));
    },
    [goalsTeam2]
  );

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

          {isLoadingTeams ? (
            <PageLoader />
          ) : (
            <>
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

              <FormControlLabel
                control={
                  <Checkbox
                    value={isGameCompleted}
                    onChange={handleChangeIsGameCompleted}
                  />
                }
                label="Is game already played?"
              />

              {isGameCompleted && (
                <div className={cls.goalsContainer}>
                  <TextField
                    label="Goals Team 1"
                    type="number"
                    value={goalsTeam1}
                    onChange={handleChangeTeam1Goals}
                  />

                  <TextField
                    sx={{ marginLeft: "8px" }}
                    label="Goals Team 2"
                    type="number"
                    value={goalsTeam2}
                    onChange={handleChangeTeam2Goals}
                  />
                </div>
              )}

              <Button
                className={cls.btnCreate}
                variant="contained"
                size="large"
                onClick={handleCreateGame}
                disabled={!team1 || !team2 || isLoadingCreateGame}
              >
                {isLoadingCreateGame ? (
                  <Typography>Loading...</Typography>
                ) : (
                  <Typography>Create</Typography>
                )}
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </DynamicModuleLoader>
  );
}
