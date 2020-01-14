import React, { useContext } from 'react';
import './style.css'
import { Doughnut } from 'react-chartjs-2';
import Button from '../Button'
import { useHistory } from 'react-router-dom'
import HogwartsContext from '../../context/HogwartsContext';


function Dashboard() {
    const history = useHistory()
    const { stats } = useContext(HogwartsContext);
    const colors = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
        '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
        '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
        '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',]
    let existingData;
    let desiredData
    try {
        existingData = {
            labels: Object.keys(stats.existing),
            datasets: [{
                label: "Existing Skills",
                backgroundColor: colors,
                data: Object.values(stats.existing),

            }]
        }
        desiredData = {
            labels: Object.keys(stats.desired),
            datasets: [{
                label: "Desired Skills",
                backgroundColor: colors,
                data: Object.values(stats.desired),

            }]
        }
    } catch (e) { }
    return (
        <div className="dashboard-container">
            <div className="dashboard-title">Dashboard</div>
            <div className="dashboard-body">
                {stats != null && <div className="doughnuts-container">
                    <div className="doughnut-wrapper">
                        <h2 className="doughnut-title">Existing Skills</h2>
                        <Doughnut data={existingData} height={370} width={370} />
                    </div>
                    <div className="doughnut-wrapper">
                        <h2 className="doughnut-title">Desired Skills</h2>
                        <Doughnut data={desiredData} height={370} width={370} />
                    </div>
                </div>}
                {stats == null && <img className="loader dashboard-loader" src="./loader.gif"></img>}
                <div className="dashboard-button-container">
                    <Button text="back" color="grey" onClick={() => history.push('/')} />
                </div>
            </div>
        </div>
    )
}

export default Dashboard;