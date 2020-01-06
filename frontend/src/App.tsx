import { H1 } from "@blueprintjs/core";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { GiftListDatasource } from "./datasource";
import { Homepage } from "./pages/homepage";
import { ManagePage } from "./pages/manage";
class App extends React.Component {

  private datasource = new GiftListDatasource("http://localhost:8000");

  public render() {
    return (
      <div className="App bp3-dark">
        <H1>GYFT</H1>
        <Router>
          <Switch>
            <Route path="/manage/:slug([A-Za-z0-9]{12})">
              <ManagePage datasource={this.datasource} />
            </Route>
            <Route path="/">
              <Homepage datasource={this.datasource} />
            </Route>
          </Switch>
        </Router>
      </div >
    );

  }
}

export default App;
