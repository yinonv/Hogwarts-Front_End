import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import './style.css';
import { getStudents } from '../../lib/api'
import User from '../User'
import Button from '../Button'

function Home() {
    const [students, setStudents] = useState(null);
    const [loading, setLoading] = useState(false);
    const [skills, setSkills] = useState(null)
    const [coursesArray, setCoursesArray] = useState(null)
    const history = useHistory();

    useEffect(() => {
        getData()
    }, []);
    const getData = async () => {
        setLoading(true)
        try {
            const response = await getStudents();
            setStudents(response.data);
            // const skillsResponse = await getSkills();
            // const coursesResponse = await getCourses();
            // setCoursesArray(coursesResponse.data)
            // setSkills(skillsResponse.data)
        } catch (e) {
            console.log(e)
        }
        setLoading(false)
    }
    return (
        <div className="home-container">
            <div>
                <h1 className="title">Hogwarts Students</h1>
            </div>
            <div className="buttons-container">
                <Button onClick={() => history.push('/add')} text="Add Student" />
            </div>
            {loading && <img className="loader-gif" src="./loader.gif"></img>}
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
