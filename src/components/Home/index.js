import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import './style.css';
import User from '../User'
import Button from '../Button'
import { getStudents } from '../../lib/api'

function Home() {
    const [students, setStudents] = useState(null);
    const history = useHistory();

    useEffect(() => { getStudentsList() }, [])
    const getStudentsList = async () => {
        const response = await getStudents()
        setStudents(response.data)
    }
    return (
        <div className="home-container">
            <div>
                <h1 className="title">Hogwarts Students</h1>
            </div>
            <div className="buttons-container">
                <Button onClick={() => history.push('/add')} text="Add Student" />
                <Button onClick={() => history.push('/dashboard')} text="Dashboard" color="yellow" />
            </div>
            {students == null && <img className="loader-gif" src="./loader.gif"></img>}
            {students != null &&
                <div>
                    <table className="table">
                        <tr className="first-row">
                            <td>Id</td>
                            <td>Name</td>
                            <td>Last Name</td>
                            <td>Existing Skills</td>
                        </tr>
                        {students != null && students.map(student => (
                            <User key={student.id} info={student} />
                        ))}
                    </table>
                </div>}
        </div>
    )
}

export default Home;
