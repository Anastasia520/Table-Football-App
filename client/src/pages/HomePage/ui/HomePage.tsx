import { PageLoader } from "../../../widgets/PageLoader";
import cls from "./HomePage.module.scss";

const HomePage = () => {
  return (
    <div className={cls.homePage}>
      <PageLoader />
    </div>
  );
};

export default HomePage;
