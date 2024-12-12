import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import cls from "./GameDetails.module.scss";
import { Button, TextField, Typography } from "@mui/material";
import { gameActions, getGameData } from "../../../../entities/Game";
import { getGame } from "../../model/services/getGame/getGame";
import { getGameRequestError } from "../../model/selectors/getGameRequestError/getGameRequestError";
import { getGameRequestLoading } from "../../model/selectors/getGameRequestLoading/getGameRequestLoading";
import { PageLoader } from "../../../../widgets/PageLoader";
import { getUpdateGameError } from "../../model/selectors/getUpdateGameError/getUpdateGameError";
import { getUpdateGameLoading } from "../../model/selectors/getUpdateGameLoading/getUpdateGameLoading";
import { putGame } from "../../model/services/putGame/putGame";

interface GameDetailsProps {
  id: string;
}

export default function GameDetails(props: GameDetailsProps) {
  const { id } = props;
  const dispatch = useDispatch();

  const [team1Goals, setTeam1Goals] = useState<number>(0);
  const [team2Goals, setTeam2Goals] = useState<number>(0);

  const gameData = useSelector(getGameData);
  const errorGame = useSelector(getGameRequestError);
  const isLoadingGame = useSelector(getGameRequestLoading);

  const errorUpdateGame = useSelector(getUpdateGameError);
  const isLoadingUpdateGame = useSelector(getUpdateGameLoading);

  useEffect(() => {
    dispatch(getGame(id));
  }, [id]);

  useEffect(() => {
    return () => {
      dispatch(gameActions.setGameData(null));
    };
  }, []);

  useEffect(() => {
    if (gameData) {
      setTeam1Goals(Number(gameData.goals_team1));
      setTeam2Goals(Number(gameData.goals_team2));
    }
  }, [gameData]);

  const handleChangeTeam1Goals = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (Number(e.target.value) < 0) {
        return;
      }
      setTeam1Goals(Number(e.target.value));
    },
    [team1Goals]
  );

  const handleChangeTeam2Goals = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (Number(e.target.value) < 0) {
        return;
      }
      setTeam2Goals(Number(e.target.value));
    },
    [team2Goals]
  );

  const handleUpdateGame = useCallback(
    (isCompleted: Boolean) => {
      dispatch(
        putGame({
          id: id,
          data: {
            goals_team1: team1Goals,
            goals_team2: team2Goals,
            status: isCompleted ? "completed" : "ongoing",
          },
        })
      );
    },
    [dispatch, team1Goals, team2Goals]
  );

  return (
    <div className={cls.gameDetailsContainer}>
      {errorGame && <Typography>{errorGame}</Typography>}
      {errorUpdateGame && <Typography>{errorUpdateGame}</Typography>}
      {isLoadingGame ? (
        <PageLoader />
      ) : (
        <>
          <div className={cls.team}>
            <Typography> {gameData.team1_id?.name} </Typography>
            <TextField
              label="Goals Team 1"
              type="number"
              value={team1Goals}
              onChange={handleChangeTeam1Goals}
            />
          </div>

          <div className={cls.team}>
            <Typography> {gameData.team2_id?.name} </Typography>
            <TextField
              label="Goals Team 2"
              type="number"
              value={team2Goals}
              onChange={handleChangeTeam2Goals}
            />
          </div>

          <div className={cls.btns}>
            <Button
              className={cls.btnCreate}
              variant="contained"
              size="large"
              onClick={handleUpdateGame}
            >
              {isLoadingUpdateGame ? (
                <Typography>Loading...</Typography>
              ) : (
                <Typography>Save changes</Typography>
              )}
            </Button>

            <Button
              className={cls.btnCreate}
              variant="contained"
              size="large"
              onClick={() => handleUpdateGame(true)}
            >
              {isLoadingUpdateGame ? (
                <Typography>Loading...</Typography>
              ) : (
                <Typography>Save and complete</Typography>
              )}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
