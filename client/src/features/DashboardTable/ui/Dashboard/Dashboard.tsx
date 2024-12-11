import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab, Typography } from "@mui/material";

import cls from "./Dashboard.module.scss";
import { PageLoader } from "../../../../widgets/PageLoader";
import TeamsStatistics from "../TeamsStatistics/TeamsStatistics";
import { getTeamsStatisticsData } from "../../../../entities/Team";
import { getTeamsStatistics } from "../../model/services/getTeamsStatistics/getTeamsStatistics";
import { getTeamStatisticsRequestError } from "../../model/selectors/getTeamStatisticsRequestError/getTeamStatisticsRequestError";
import { getTeamStatisticsRequestLoading } from "../../model/selectors/getTeamStatisticsRequestLoading/getTeamStatisticsRequestLoading";
import {
  DynamicModuleLoader,
  ReducersList,
} from "../../../../shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { getTeamsStatisticsRequestReducer } from "../../model/slice/getTeamsStatisticsSlice";

const initialReducers: ReducersList = {
  teamStatisticsRequest: getTeamsStatisticsRequestReducer,
};

export default function Dashboard() {
  const dispatch = useDispatch();

  const TeamsStatisticsData = useSelector(getTeamsStatisticsData);
  const error = useSelector(getTeamStatisticsRequestError);
  const isLoading = useSelector(getTeamStatisticsRequestLoading);

  const [tabValue, setTabValue] = useState<string>("1");

  const handleChangeTab = useCallback((value: string) => {
    setTabValue(value);
  }, []);

  useEffect(() => {
    dispatch(getTeamsStatistics(null));
  }, [dispatch]);

  return (
    <>
      <DynamicModuleLoader reducers={initialReducers}>
        {error && <Typography>Error</Typography>}
        {isLoading ? (
          <div className={cls.loadingContainer}>
            <PageLoader />
          </div>
        ) : (
          <TabContext value={tabValue}>
            <TabList onChange={(e, value) => handleChangeTab(value)}>
              <Tab label="Teams" value={"1"} />
              <Tab label="Players" value={"2"} />
            </TabList>

            <TabPanel value={"1"}>
              <TeamsStatistics
                statistics={TeamsStatisticsData?.teamsStatistics}
              />
            </TabPanel>

            <TabPanel value={"2"}>Players</TabPanel>
          </TabContext>
        )}
      </DynamicModuleLoader>
    </>
  );
}
