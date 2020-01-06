import { H1 } from "@blueprintjs/core";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import React from "react";
import "./App.css";
import { GiftListDatasource } from "./datasource";
import { Homepage } from "./pages/homepage"
class App extends React.Component {

  private datasource = new GiftListDatasource("http://localhost:8000");

  public render() {
    return (
      <div className="App bp3-dark">
        <H1>GYFT</H1>
        <Homepage datasource={this.datasource} />
      </div >
    );

  }
}

export default App;
