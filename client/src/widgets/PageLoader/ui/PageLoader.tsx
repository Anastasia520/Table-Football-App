import { Loader } from "../../../shared/ui/Loader/Loader";

import cls from "./PageLoader.module.scss";

export const PageLoader = () => (
  <div className={cls.PageLoader}>
    <Loader />
  </div>
);
