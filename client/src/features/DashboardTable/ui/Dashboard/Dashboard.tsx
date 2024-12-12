import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab, Typography } from "@mui/material";

import cls from "./Dashboard.module.scss";
import { PageLoader } from "../../../../widgets/PageLoader";
import TeamsStatistics from "../TeamsStatistics/TeamsStatistics";
import { getTeamsStatisticsData } from "../../../../entities/Team";
import { getTeamsStatistics } from "../../model/services/getTeamsStatistics/getTeamsStatistics";
import {
  DynamicModuleLoader,
  ReducersList,
} from "../../../../shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { getTeamsStatisticsRequestReducer } from "../../model/slice/getTeamsStatisticsSlice";
import { getTeamsStatisticsRequestError } from "../../model/selectors/getTeamStatisticsRequestError/getTeamStatisticsRequestError";
import { getTeamsStatisticsRequestLoading } from "../../model/selectors/getTeamStatisticsRequestLoading/getTeamStatisticsRequestLoading";
import PlayersStatistics from "../PlayersStatistics/PlayersStatistics";
import { getPlayersStatisticsData } from "../../../../entities/Player";
import { getPlayersStatisticsRequestError } from "../../model/selectors/getPlayersStatisticsRequestError/getPlayersStatisticsRequestError";
import { getPlayersStatisticsRequestLoading } from "../../model/selectors/getPlayersStatisticsRequestLoading/getPlayersStatisticsRequestLoading";
import { getPlayersStatistics } from "../../model/services/getPlayersStatistics/getPlayersStatistics";
import { getPlayersStatisticsRequestReducer } from "../../model/slice/getPlayersStatisticsSlice";

const initialReducers: ReducersList = {
  teamsStatisticsRequest: getTeamsStatisticsRequestReducer,
  playersStatisticsRequest: getPlayersStatisticsRequestReducer,
};

export default function Dashboard() {
  const dispatch = useDispatch();

  const TeamsStatisticsData = useSelector(getTeamsStatisticsData);
  const errorTeamsStatistics = useSelector(getTeamsStatisticsRequestError);
  const isLoadingTeamsStatistics = useSelector(
    getTeamsStatisticsRequestLoading
  );

  const PlayersStatisticsData = useSelector(getPlayersStatisticsData);
  const errorPlayersStatistics = useSelector(getPlayersStatisticsRequestError);
  const isLoadingPlayersStatistics = useSelector(
    getPlayersStatisticsRequestLoading
  );

  const [tabValue, setTabValue] = useState<string>("1");

  const handleChangeTab = useCallback((value: string) => {
    setTabValue(value);
  }, []);

  useEffect(() => {
    if (tabValue === "1") {
      dispatch(getTeamsStatistics());
    } else if (tabValue === "2") {
      dispatch(getPlayersStatistics());
    }
  }, [tabValue]);

  return (
    <>
      <DynamicModuleLoader reducers={initialReducers}>
        {errorTeamsStatistics && (
          <Typography>{errorTeamsStatistics}</Typography>
        )}
        {errorPlayersStatistics && (
          <Typography>{errorPlayersStatistics}</Typography>
        )}

        <TabContext value={tabValue}>
          <TabList onChange={(e, value) => handleChangeTab(value)}>
            <Tab label="Teams" value={"1"} />
            <Tab label="Players" value={"2"} />
          </TabList>

          <TabPanel value={"1"}>
            {isLoadingTeamsStatistics ? (
              <div className={cls.loadingContainer}>
                <PageLoader />
              </div>
            ) : (
              <TeamsStatistics
                statistics={TeamsStatisticsData?.teamsStatistics}
              />
            )}
          </TabPanel>

          <TabPanel value={"2"}>
            {isLoadingPlayersStatistics ? (
              <div className={cls.loadingContainer}>
                <PageLoader />
              </div>
            ) : (
              <PlayersStatistics
                statistics={PlayersStatisticsData?.playersStatistics}
              />
            )}
          </TabPanel>
        </TabContext>
      </DynamicModuleLoader>
    </>
  );
}
