import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LinkedList from "./page/linked-list/linkedList.js";
import AddNode from './page/addNode/addNode.js';
import './App.css';

function App({socket}) {
  return (
    <div className="App">
      <Router>
        <div style={{ height: "100%" }}>
          <Switch>
            <Route path="/linkedlist"
              render={() => <LinkedList socket={socket} />} />
            <Route path="/"
              render={() => <AddNode socket={socket} />} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
