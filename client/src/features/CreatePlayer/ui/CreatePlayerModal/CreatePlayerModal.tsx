import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, Button, Modal, TextField, Typography } from "@mui/material";

import cls from "./CreatePlayerModal.module.scss";
import { CloseRounded } from "@mui/icons-material";

import { getCreatePlayerLoading } from "../../model/selectors/getCreatePlayerLoading/getCreatePlayerLoading";
import { getCreatePlayerError } from "../../model/selectors/getCreatePlayerError/getCreatePlayerError";
import { postCreatePlayer } from "../../model/services/postCreatePlayer/postCreatePlayer";
import {
  DynamicModuleLoader,
  ReducersList,
} from "../../../../shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { createPlayerReducer } from "../../model/slice/createPlayerSlice";
import { getPlayerStatisticsData } from "../../../../entities/Player/model/selectors/getPlayerStatisticsData/getPlayerStatisticsData";
import { playerStatisticsActions } from "../../../../entities/Player/model/slice/playerStatisticsSlice";

interface CreatePlayerModalProps {
  open: boolean;
  handleClose: () => void;
}

const initialReducers: ReducersList = {
  createPlayer: createPlayerReducer,
};

export default function CreatePlayerModal(props: CreatePlayerModalProps) {
  const { open, handleClose } = props;

  const dispatch = useDispatch();

  const createPlayerData = useSelector(getPlayerStatisticsData);

  const isLoadingCreatePlayer = useSelector(getCreatePlayerLoading);
  const errorCreatePlayer = useSelector(getCreatePlayerError);

  const [name, setName] = useState("");

  const handleChangeName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
    },
    [name]
  );

  const handleCreatePlayer = useCallback(() => {
    dispatch(postCreatePlayer({ name: name }));
  }, [dispatch, name]);

  useEffect(() => {
    if (createPlayerData?.id) {
      setName("");
    }
  }, [createPlayerData]);

  useEffect(() => {
    return () => {
      dispatch(
        playerStatisticsActions.setPlayerStatisticsData({ name: "", id: "" })
      );
    };
  }, []);

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <Modal open={open} onClose={handleClose} className={cls.modal}>
        <Box className={cls.modalContainer}>
          <div className={cls.modalHeader}>
            <Typography fontSize={24}>Create a new player</Typography>
            <div onClick={handleClose}>
              <CloseRounded />
            </div>
          </div>
          {errorCreatePlayer && <Typography>{errorCreatePlayer}</Typography>}

          {createPlayerData?.name && !errorCreatePlayer && (
            <Typography className={cls.success}>
              {createPlayerData.name} is created! Do you want to create another
              player?
            </Typography>
          )}

          <TextField
            required
            label="Name"
            value={name}
            onChange={handleChangeName}
          />

          <Button
            className={cls.btnCreate}
            variant="contained"
            size="large"
            onClick={handleCreatePlayer}
            disabled={!name}
          >
            {isLoadingCreatePlayer ? (
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
