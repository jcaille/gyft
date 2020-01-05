import React from 'react';
import './App.css';
import logo from './logo.svg';
import axios from "axios";

/* 

class Gift(models.Model):

    uuid = models.UUIDField(primary_key = True, default=uuid.uuid4, editable=False)

    title = models.CharField(max_length = 120)
    description = models.TextField()
    cost = models.IntegerField()

    gift_list = models.ForeignKey(GiftList, on_delete = models.CASCADE)

    completed = models.BooleanField(default = False)
    completed_on = models.DateTimeField(null = True)
    completed_by = models.CharField(max_length = 120, null = True, blank = True)

    created_on = models.DateTimeField(auto_now_add=True)
    created_by = models.CharField(max_length = 120)

    def __str__(self):
        return f"<Gift: {self.title}>"
*/

interface IGiftList {
  uuid: string;
  owner_link?: string;
  contributor_link?: string;
  recipient_link?: string;

  title: string;
  recipient: string;
  description: string;

  created_on: string; // Iso 8601 datetime
  created_by: string;
}

interface IGiftBase {
  uuid: string;
  title: string;
  description: string;
  cost: number;
  list_uuid: string;
  created_on: string; // Iso 8601 datetime
  created_by: string;
}

interface IIncompleteGift extends IGiftBase {
  completed: false;
}

interface ICompleteGift extends IGiftBase {
  completed: true;
  completed_by: string;
  completed_on: string; // Iso 8601 datetime
}

export type IGift = IIncompleteGift | ICompleteGift;

function isCompletedGift(x: IGift): x is ICompleteGift {
  return x.completed
}

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
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload !
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );

  }
}

export default App;
