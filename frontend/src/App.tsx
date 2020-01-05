import React from 'react';
import logo from './logo.svg';
import axios from "axios";
import { IGift, IGiftList } from "./types"
import { GiftListCreator } from "./GiftListCreator"
import '@blueprintjs/core/lib/css/blueprint.css'

class App extends React.Component {

  async getDataAxios() {
    const random_uuid = "5091e951-030e-4744-866b-895a6b1cb0aa"
    const response = await axios.get('http://localhost:8000/api/gift-lists')
    const result: IGift[] = response.data
    console.log(result);
  }

  public render() {
    this.getDataAxios();
    return (
      <div className="App">
        <h1> Gyft </h1>
        <GiftListCreator />
      </div>
    );

  }
}

export default App;
