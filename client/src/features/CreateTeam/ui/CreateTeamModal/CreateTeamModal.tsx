import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Box,
  Button,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";

import cls from "./CreateTeamModal.module.scss";
import { CloseRounded } from "@mui/icons-material";

import {
  DynamicModuleLoader,
  ReducersList,
} from "../../../../shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { createTeamReducer } from "../../model/slice/createTeamSlice";
import { getCreateTeamLoading } from "../../model/selectors/getCreateTeamLoading/getCreateTeamLoading";
import { getCreateTeamError } from "../../model/selectors/getCreateTeamError/getCreateTeamError";
import { postCreateTeam } from "../../model/services/postCreatePlayer/postCreateTeam";
import { Player } from "../../../../entities/Player/model/types/playerStatistic";
import { teamStatisticsActions } from "../../../../entities/Team/model/slice/teamStatisticsSlice";
import { getPlayersStatistics } from "../../../DashboardTable/model/services/getPlayersStatistics/getPlayersStatistics";
import { getPlayersStatisticsData } from "../../../../entities/Player";
import {
  getPlayersStatisticsRequestError,
  getPlayersStatisticsRequestLoading,
} from "../../../DashboardTable";
import { getTeamStatisticsData } from "../../../../entities/Team";

interface CreatePlayerModalProps {
  open: boolean;
  handleClose: () => void;
}

const initialReducers: ReducersList = {
  createTeam: createTeamReducer,
};

export default function CreateTeamModal(props: CreatePlayerModalProps) {
  const { open, handleClose } = props;

  const dispatch = useDispatch();

  const createTeamData = useSelector(getTeamStatisticsData);
  const isLoadingCreateTeam = useSelector(getCreateTeamLoading);
  const errorCreateTeam = useSelector(getCreateTeamError);

  const playersData = useSelector(getPlayersStatisticsData);
  const errorPlayers = useSelector(getPlayersStatisticsRequestError);
  const isLoadingPlayers = useSelector(getPlayersStatisticsRequestLoading);

  const [name, setName] = useState("");
  const [players, setPlayers] = useState<Array<Player>>([]);
  const [player1, setPlayer1] = useState<Player | null>(null);
  const [player2, setPlayer2] = useState<Player | null>(null);

  const handleChangeName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
    },
    [name]
  );

  const handleCreateTeam = useCallback(() => {
    dispatch(
      postCreateTeam({
        name: name,
        player1_id: String(player1?.id),
        player2_id: player2 ? String(player2?.id) : null,
      })
    );
  }, [dispatch, name, player1, player2]);

  const handleChangePlayer1 = useCallback(
    (e: SelectChangeEvent<string>) => {
      const player = JSON.parse(e.target.value);
      setPlayer1(player as Player);
    },
    [player1]
  );

  const handleChangePlayer2 = useCallback(
    (e: SelectChangeEvent<string>) => {
      const player = JSON.parse(e.target.value);
      setPlayer2(player as Player);
    },
    [player2]
  );

  useEffect(() => {
    if (createTeamData?.id) {
      setName("");
      setPlayer1(null);
      setPlayer2(null);
    }
  }, [createTeamData]);

  useEffect(() => {
    dispatch(getPlayersStatistics(null));

    return () => {
      dispatch(
        teamStatisticsActions.setTeamStatisticsData({ name: "", id: "" })
      );
    };
  }, []);

  useEffect(() => {
    if (playersData) {
      setPlayers(playersData.playersStatistics?.players as Array<Player>);
    }
  }, [playersData]);

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <Modal open={open} onClose={handleClose} className={cls.modal}>
        <Box className={cls.modalContainer}>
          <div className={cls.modalHeader}>
            <Typography fontSize={24}>Create a new team</Typography>
            <div onClick={handleClose}>
              <CloseRounded />
            </div>
          </div>
          {errorCreateTeam && <Typography>{errorCreateTeam}</Typography>}
          {errorPlayers && <Typography>{errorPlayers}</Typography>}

          {createTeamData?.name && !errorCreateTeam && (
            <Typography className={cls.success}>
              {createTeamData.name} is created! Do you want to create another
              team?
            </Typography>
          )}

          <TextField
            required
            label="Name"
            value={name}
            onChange={handleChangeName}
          />

          <Select
            required
            value={JSON.stringify(player1) || ""}
            label="Player 1"
            onChange={handleChangePlayer1}
          >
            {players?.map((player) => (
              <MenuItem key={player.id} value={JSON.stringify(player)}>
                {player.name}
              </MenuItem>
            ))}
          </Select>

          <Select
            value={JSON.stringify(player2) || ""}
            label="Player 2"
            onChange={handleChangePlayer2}
          >
            {players
              ?.filter((player) => player.id != player1?.id)
              .map((player) => (
                <MenuItem key={player.id} value={JSON.stringify(player)}>
                  {player.name}
                </MenuItem>
              ))}
          </Select>

          <Button
            className={cls.btnCreate}
            variant="contained"
            size="large"
            onClick={handleCreateTeam}
            disabled={!name || !player1}
          >
            {isLoadingCreateTeam || isLoadingPlayers ? (
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
