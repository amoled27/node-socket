import './App.css';
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LinkedListView from "./page/linked-list/linked-list-view.js";
import NodeAdder from './page/node-adder/node-adder.js';
function App({socket}) {
  return (
    <div className="App">
      <Router>
        <div style={{ height: "100%" }}>
          <Switch>
            <Route path="/linkedlist"
              render={() => <LinkedListView socket={socket} />} />
            <Route path="/"
              render={() => <NodeAdder socket={socket} />} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
