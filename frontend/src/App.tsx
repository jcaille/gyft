import "@blueprintjs/core/lib/css/blueprint.css";
import React from "react";
import { GiftListDatasource } from "./datasource";
import { GiftListCreator } from "./GiftListCreator";

class App extends React.Component {

  private datasource = new GiftListDatasource("http://localhost:8000");

  public render() {
    return (
      <div className="App">
        <h1> Gyft </h1>
        <GiftListCreator datasource={this.datasource} />
      </div>
    );

  }
}

export default App;
