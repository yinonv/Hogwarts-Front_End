import React, { useContext } from 'react';
import './style.css'
import Button from '../Button';
import { useHistory } from 'react-router-dom'
import { deleteStudent } from '../../lib/api'
import { useAlert, positions } from 'react-alert'
import swal from 'sweetalert';
import HogwartsContext from '../../context/HogwartsContext'

function DisplayUser(props) {
    const history = useHistory();
    const alert = useAlert()
    const { info } = props;
    const { name, lastName, id, existing, desired, courses, createDate, lastUpdate } = info;
    const { updateStats } = useContext(HogwartsContext);

    const handleDelete = async () => {
        const answer = await swal(`Are you sure you want to delete ${name} ${lastName}?`, {
            dangerMode: true,
            buttons: true,
        });
        if (answer == null) {
            return
        }
        const response = await deleteStudent(id)
        if (response) {
            const settings = { timeout: 2000, position: positions.BOTTOM_CENTER }
            alert.success('Student Deleted', settings)
            updateStats();
            history.push('/');
        }
    }

    return (
        <div className="display-student-container">
            <h1 className="student-title">Student</h1>
            <table className="student-info-table">
                <tr className="student-row">
                    <td className="col-title">Id</td>
                    <td className="col-value">{id}</td>
                </tr>
                <tr className="student-row">
                    <td className="col-title">Name</td>
                    <td className="col-value">{name}</td>
                </tr>
                <tr className="student-row">
                    <td className="col-title">Last name</td>
                    <td className="col-value">{lastName}</td>
                </tr>
                <tr className="student-row">
                    <td className="col-title">Existing skills</td>
                    <td className="col-value">{existing.map(exist => `${exist.skill}(${exist.level}), `)}</td>
                </tr>
                <tr className="student-row">
                    <td className="col-title">Desired skills</td>
                    <td className="col-value">{desired.map(d => `${d.skill}(${d.level}), `)}</td>
                </tr>
                <tr className="student-row">
                    <td className="col-title">Courses</td>
                    <td className="col-value">{courses.map(course => course)}</td>
                </tr>
                <tr className="student-row">
                    <td className="col-title">Created At</td>
                    <td className="col-value">{`${createDate.date} - ${createDate.time}`}</td>
                </tr>
                {lastUpdate != undefined &&
                    <tr className="student-row">
                        <td className="col-title">Last Update</td>
                        <td className="col-value">{`${lastUpdate.date} - ${lastUpdate.time}`}</td>
                    </tr>}
            </table>
            <div className="student-buttons-container">
                <Button onClick={() => history.push('/')} text="Back" color="grey" />
                <Button onClick={() => history.push('/student/edit')} text="Edit" />
                <Button onClick={handleDelete} color="red" text="Delete" />
            </div>
        </div>
    )
}

export default DisplayUser;