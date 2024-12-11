import { Suspense } from "react";
import { AppRouter } from "./providers/router";

import "./App.css";

const App: React.FC = () => {
  return (
    <div className="app">
      <Suspense fallback="">
        <div className="content-page">
          <AppRouter />
        </div>
      </Suspense>
    </div>
  );
};

export default App;
