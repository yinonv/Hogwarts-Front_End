import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import Home from './components/Home'
import HogwartsContext from './context/HogwartsContext'
import DisplayUser from './components/DisplayUser'
import NewStudent from './components/NewStudent'
import EditStudent from './components/EditStudent'


function App() {
  const [info, setInfo] = useState(null);
  const updateInfo = data => setInfo(data)

  return (
    <div className="app-container">
      <Router>
        <Switch>
          <Route exact path="/">
            <HogwartsContext.Provider value={updateInfo}>
              <Home />
            </HogwartsContext.Provider>
          </Route>
          <Route exact path="/student">
            <DisplayUser info={info} />
          </Route>
          <Route exact path="/student/edit">
            <HogwartsContext.Provider value={updateInfo}>
              <EditStudent info={info} />
            </HogwartsContext.Provider>
          </Route>
          <Route exact path="/add">
            <NewStudent />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
