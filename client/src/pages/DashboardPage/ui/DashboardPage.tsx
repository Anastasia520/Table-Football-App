import { useNavigate } from "react-router-dom";

import { Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import cls from "./DashboardPage.module.scss";
import { Dashboard } from "../../../features/DashboardTable";

const DashboardPage = () => {
  const navigate = useNavigate();

  return (
    <div className={cls.homePage}>
      <div className={cls.header}>
        <div className={cls.homeLink} onClick={() => navigate("/")}>
          <ArrowBackIcon color="primary" />
        </div>
        <Typography fontSize={20}>Dashboards</Typography>
      </div>

      <div className={cls.mainContainer}>
        <Dashboard />
      </div>
    </div>
  );
};

export default DashboardPage;
