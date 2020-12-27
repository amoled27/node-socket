import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddNode from './page/addNode/addNode.js';
import './App.css';
import LinkedLists from "./page/linked-list/linkedLIsts.js";

function App({socket}) {
  return (
    <div className="App">
      <Router>
        <div style={{ height: "100%" }}>
          <Switch>
            <Route path="/linkedlist"
              render={() => <LinkedLists socket={socket} />} />
            <Route path="/"
              render={() => <AddNode socket={socket} />} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
