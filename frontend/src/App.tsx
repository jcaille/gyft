import { Card, Elevation, H1, H2, H3, H5, Icon } from "@blueprintjs/core";
import "@blueprintjs/core/lib/css/blueprint.css";
import { IconNames } from "@blueprintjs/icons";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import React from "react";
import "./App.css";
import { GiftListDatasource } from "./datasource";
import { GiftListCreator } from "./GiftListCreator";

class App extends React.Component {

  private datasource = new GiftListDatasource("http://localhost:8000");

  public render() {
    return (
      <div className="App bp3-dark">
        <H1>GYFT</H1>
        <div className="description-column-container">
          <Card elevation={Elevation.TWO} className="description-card">
            <Icon icon={IconNames.PEOPLE} iconSize={40} />
            <H5>Create and collaborate on gift lists</H5>
          </Card>
          <Card elevation={Elevation.TWO} className="description-card">
            <Icon icon={IconNames.SHOP} iconSize={40} />
            <H5>Everyone can contribute an idea or select a gift to give</H5>
          </Card>
          <Card elevation={Elevation.TWO} className="description-card">
            <Icon icon={IconNames.HEART} iconSize={40} />
            <H5>Never offer a duplicate gift again</H5>
          </Card>
        </div>
        <Card elevation={Elevation.FOUR} className="gift-list-creator-container">
          <H3>Start by creating a new list</H3>
          <GiftListCreator datasource={this.datasource} />
        </Card>

      </div >
    );

  }
}

export default App;
