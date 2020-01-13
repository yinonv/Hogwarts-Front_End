import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import Home from './components/Home'
import HogwartsContext from './context/HogwartsContext'
import DisplayUser from './components/DisplayUser'
import EditStudent from './components/EditStudent'


function App() {
  const [editInfo, setEditInfo] = useState(null);
  const [newInfo, setNewInfo] = useState({
    name: '',
    lastName: '',
    existing: [],
    desired: [],
    courses: [],
  });
  const updateInfo = (data, type) => {
    if (type == "new") {
      setNewInfo(data)
    } else {
      setEditInfo(data)
    }
  }

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
            <DisplayUser info={editInfo} />
          </Route>
          <Route exact path="/student/edit">
            <HogwartsContext.Provider value={updateInfo} >
              <EditStudent info={editInfo} title="Edit Student" text="Update Student" type="edit" />
            </HogwartsContext.Provider>
          </Route>
          <Route exact path="/add">
            <HogwartsContext.Provider value={updateInfo} >
              <EditStudent info={newInfo} title="New Student" text="Create Student" type="new" />
            </HogwartsContext.Provider>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
