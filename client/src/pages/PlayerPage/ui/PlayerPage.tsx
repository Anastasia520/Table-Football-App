import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";

import cls from "./PlayerPage.module.scss";
import { CreatePlayerModal } from "../../../features/CreatePlayer";
import { CreateTeamModal } from "../../../features/CreateTeam";
import { CreateGameModal } from "../../../features/CreateGame";

const PlayerPage = () => {
  const navigate = useNavigate();

  const [openCreatePlayerModal, setOpenCreatePlayerModal] = useState(false);
  const [openCreateTeamModal, setOpenCreateTeamModal] = useState(false);
  const [openCreateGameModal, setOpenCreateGameModal] = useState(false);

  const handleCloseCreatePlayerModal = useCallback(() => {
    setOpenCreatePlayerModal(false);
  }, []);

  const handleCloseCreateTeamModal = useCallback(() => {
    setOpenCreateTeamModal(false);
  }, []);

  const handleCloseCreateGameModal = useCallback(() => {
    setOpenCreateGameModal(false);
  }, []);

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
          <Button
            variant="contained"
            size="large"
            onClick={() => setOpenCreateGameModal(true)}
          >
            Create a game
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/dashboard")}
          >
            Go to dashboards
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={() => setOpenCreatePlayerModal(true)}
          >
            Create a new player
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={() => setOpenCreateTeamModal(true)}
          >
            Create a new team
          </Button>
        </div>
      </div>

      {openCreatePlayerModal && (
        <CreatePlayerModal
          open={openCreatePlayerModal}
          handleClose={handleCloseCreatePlayerModal}
        />
      )}

      {openCreateTeamModal && (
        <CreateTeamModal
          open={openCreateTeamModal}
          handleClose={handleCloseCreateTeamModal}
        />
      )}

      {openCreateGameModal && (
        <CreateGameModal
          open={openCreateGameModal}
          handleClose={handleCloseCreateGameModal}
        />
      )}
    </div>
  );
};

export default PlayerPage;
