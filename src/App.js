import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { getSkills, getCourses, getStats } from './lib/api'
import './App.css';
import Home from './components/Home'
import HogwartsContext from './context/HogwartsContext'
import DisplayUser from './components/DisplayUser'
import EditStudent from './components/EditStudent'
import Dashboard from './components/Dashboard'


function App() {
  const [changed, setChanged] = useState(false);
  const [editInfo, setEditInfo] = useState(null);
  const [skills, setSkills] = useState(null)
  const [coursesArray, setCoursesArray] = useState(null)
  const [stats, setStats] = useState(null)
  const [newInfo, setNewInfo] = useState({
    name: '',
    lastName: '',
    existing: [],
    desired: [],
    courses: [],
  });
  useEffect(() => { getData(); updateStates() }, []);
  const getData = async () => {
    const skillsResponse = await getSkills();
    const coursesResponse = await getCourses();
    setCoursesArray(coursesResponse.data)
    setSkills(skillsResponse.data)
  }
  const updateStates = async () => {
    const response = await getStats();
    setStats(response.data);
  }
  const updateInfo = (data, type) => {
    if (type == "new") {
      setNewInfo(data)
    } else {
      setEditInfo(data)
    }
    setChanged(true)
  }
  const setDisplayInfo = data => setEditInfo(data)
  const resetChanges = () => setChanged(false);
  const value = {
    updateInfo: updateInfo,
    resetChanges: resetChanges,
    changed: changed,
    skills: skills,
    coursesArray: coursesArray,
    setDisplayInfo: setDisplayInfo,
    stats: stats,
    updateStates: updateStates
  }

  return (
    <div className="app-container">
      <Router>
        <Switch>
          <HogwartsContext.Provider value={value}>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/dashboard">
              <Dashboard stats={stats} />
            </Route>
            <Route exact path="/student">
              <DisplayUser info={editInfo} />
            </Route>
            <Route exact path="/student/edit">
              <EditStudent info={editInfo} title="Edit Student" text="Update Student" type="edit" />
            </Route>
            <Route exact path="/add">
              <EditStudent info={newInfo} title="New Student" text="Create Student" type="new" />
            </Route>
          </HogwartsContext.Provider>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
