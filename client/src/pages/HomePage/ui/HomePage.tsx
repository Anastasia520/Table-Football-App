import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";

import cls from "./HomePage.module.scss";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className={cls.homePage}>
      <div className={cls.mainContainer}>
        <Typography fontSize={48} className={cls.promoText}>
          Welcome to Table Football Tracker!
        </Typography>

        <Typography fontSize={18} className={cls.promoSubtext}>
          Easily track your games and stats with our app: Start new games or log
          finished matches. View dashboards for team and player insights. Add
          players and teams and explore their profiles. Simplify your game and
          enjoy detailed, hassle-free stats!
        </Typography>

        <div className={cls.btns}>
          <Button variant="contained" size="large">
            Create a game
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/dashboards")}
          >
            Go to dashboards
          </Button>
          <Button variant="contained" size="large">
            Create a new player
          </Button>
          <Button variant="contained" size="large">
            Create a new team
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
