import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import cls from "./GameDetails.module.scss";
import { Button, TextField, Typography } from "@mui/material";
import { getGameData } from "../../../../entities/Game";
import { getGame } from "../../model/services/getGame/getGame";
import { getGameRequestError } from "../../model/selectors/getGameRequestError/getGameRequestError";
import { getGameRequestLoading } from "../../model/selectors/getGameRequestLoading/getGameRequestLoading";

interface GameDetailsProps {
  id: string;
}

export default function GameDetails(props: GameDetailsProps) {
  const { id } = props;
  const dispatch = useDispatch();

  const [team1Goals, setTeam1Goals] = useState(0);
  const [team2Goals, setTeam2Goals] = useState(0);

  const gameData = useSelector(getGameData);
  const errorGame = useSelector(getGameRequestError);
  const isLoadingGame = useSelector(getGameRequestLoading);

  useEffect(() => {
    dispatch(getGame(id));
  }, [id]);

  useEffect(() => {
    if (gameData) {
      console.log(gameData);
    }
  }, [gameData]);

  const handleChangeTeam1Goals = () => {};

  const handleChangeTeam2Goals = () => {};

  return (
    <div className={cls.gameDetailsContainer}>
      <div className={cls.team}>
        {/* <Typography> {team1} </Typography> */}
        <TextField
          label="Goals"
          value={team1Goals}
          onChange={handleChangeTeam1Goals}
        />
      </div>

      <div className={cls.team}>
        {/* <Typography> {team2} </Typography> */}
        <TextField
          label="Goals"
          value={team2Goals}
          onChange={handleChangeTeam2Goals}
        />
      </div>

      <div className={cls.btns}>
        <Button
          className={cls.btnCreate}
          variant="contained"
          size="large"
          //   onClick={handleCreatePlayer}
          //   disabled={!name}
        >
          {/* {isLoadingCreatePlayer ? (
            <Typography>Loading...</Typography>
          ) : (
            <Typography>Save changes</Typography>
          )} */}

          <Typography>Save changes</Typography>
        </Button>

        <Button
          className={cls.btnCreate}
          variant="contained"
          size="large"
          //   onClick={handleCreatePlayer}
          //   disabled={!name}
        >
          {/* {isLoadingCreatePlayer ? (
            <Typography>Loading...</Typography>
          ) : (
            <Typography>Save and complete</Typography>
          )} */}
          <Typography>Save and complete</Typography>
        </Button>
      </div>
    </div>
  );
}
