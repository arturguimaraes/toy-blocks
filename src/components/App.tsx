import React from "react";
import { BrowserRouter as HashRouter, Switch, Route } from "react-router-dom";

import Nodes from "../containers/Nodes";
import NotFoundPage from "./NotFoundPage";

const App: React.FC = () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Nodes} />
        <Route component={NotFoundPage} />
      </Switch>
    </HashRouter>
  );
};

export default App;
