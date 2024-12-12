import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { Typography } from "@mui/material";

import cls from "./TeamPage.module.scss";
import { TeamDetails } from "../../../features/TeamDetails";

const TeamPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className={cls.teamPage}>
      <div className={cls.header}>
        <div className={cls.homeLink} onClick={() => navigate(-1)}>
          <ArrowBackIcon color="primary" />
        </div>
        <Typography fontSize={20}>Team Info </Typography>
      </div>

      <div className={cls.mainContainer}>
        <TeamDetails id={String(id)} />
      </div>
    </div>
  );
};

export default TeamPage;
