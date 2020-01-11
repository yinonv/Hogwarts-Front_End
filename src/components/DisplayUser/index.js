import React, { useContext } from 'react';
import './style.css'
import Button from '../Button';
import { useHistory } from 'react-router-dom'

function DisplayUser(props) {
    const history = useHistory();
    const { info } = props;
    const { name, lastName, id } = info;
    return (
        <div className="display-student-container">
            <h1 className="student-title">Student</h1>
            <table className="student-info-table">
                <tr className="student-row">
                    <td className="col-title">Id</td>
                    <td>{id}</td>
                </tr>
                <tr className="student-row">
                    <td className="col-title">Name</td>
                    <td>{name}</td>
                </tr>
                <tr className="student-row">
                    <td className="col-title">Last name</td>
                    <td>{lastName}</td>
                </tr>
            </table>
            <Button onClick={() => history.push('/')} text="Back" />
        </div>
    )
}

export default DisplayUser;