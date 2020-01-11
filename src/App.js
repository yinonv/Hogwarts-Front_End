import React, { useState, useEffect } from 'react';
import Home from './components/Home'
import './App.css';
import HogwartsContext from './context/HogwartsContext'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DisplayUser from './components/DisplayUser'
import NewStudent from './components/NewStudent'


function App() {
  const [displayedStudent, setDisplayed] = useState(null);

  const update = (info) => {
    setDisplayed(<DisplayUser info={info} />)
  }
  return (
    <div className="app-container">
      <Router>
        <Switch>
          <Route exact path="/">
            <HogwartsContext.Provider value={update}>
              <Home />
            </HogwartsContext.Provider>
          </Route>
          <Route exact path="/student">
            {displayedStudent}
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
