import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { Typography } from "@mui/material";

import cls from "./PlayerPage.module.scss";
import PlayerDetails from "../../../features/PlayerDetails/ui/PlayerDetails/PlayerDetails";

const PlayerPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className={cls.playerPage}>
      <div className={cls.header}>
        <div className={cls.homeLink} onClick={() => navigate(-1)}>
          <ArrowBackIcon color="primary" />
        </div>
        <Typography fontSize={20}>Player Info </Typography>
      </div>

      <div className={cls.mainContainer}>
        <PlayerDetails id={String(id)} />
      </div>
    </div>
  );
};

export default PlayerPage;
