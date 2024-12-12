import { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import cls from "./GamePage.module.scss";
import { GameDetails } from "../../../features/GameDetails";

const GamePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className={cls.gamePage}>
      <div className={cls.mainContainer}>
        <div className={cls.header}>
          <div className={cls.homeLink} onClick={() => navigate(-1)}>
            <ArrowBackIcon color="primary" />
          </div>
          <Typography fontSize={20}>Game</Typography>
        </div>

        <GameDetails id={String(id)} />
      </div>
    </div>
  );
};

export default GamePage;
