import React, { useEffect, useState, useRef, useContext } from 'react';
import './style.css'
import { getSkills, getCourses, addStudent, updateStudent } from '../../lib/api'
import Button from '../Button'
import { useHistory } from 'react-router-dom'
import { getDate } from '../../tools'
import HogwartsContext from '../../context/HogwartsContext'

function NewStudent(props) {
    const [skills, setSkills] = useState(null)
    const [coursesArray, setCoursesArray] = useState(null)
    const [name, setName] = useState(props.info.name)
    const [lastName, setLastName] = useState(props.info.lastName)
    const student = { ...props.info }
    const skill = useRef(null)
    const level = useRef(null)
    const course = useRef(null)
    const history = useHistory()
    const updateInfo = useContext(HogwartsContext);

    useEffect(() => {
        displayData()
    }, []);
    const displayData = async () => {
        const skillsResponse = await getSkills();
        const coursesResponse = await getCourses();
        setCoursesArray(coursesResponse.data)
        setSkills(skillsResponse.data)
    }
    const updateSkills = (e) => {
        const text = e.target.innerHTML;
        const selectedSkill = skill.current.value;
        const selectedLevel = level.current.value;
        if (text == "add existing") {
            student.existing.push({ skill: selectedSkill, level: selectedLevel })
        } else {
            student.desired.push({ skill: selectedSkill, level: selectedLevel })
        }
        updateInfo({ ...student })
    }
    const updateCourse = () => {
        const selectedCourse = course.current.value;
        student.courses.push(selectedCourse)
        updateInfo({ ...student })
    }
    const saveUpdate = async () => {
        student.name = name;
        student.lastName = lastName;
        student.lastUpdate = getDate()
        const response = await updateStudent(student)
        updateInfo({...student})
        history.push('/student')
    }
    const deleteExisting = (e, i) => {
        student.existing.splice(i, 1);
        e.target.innerHTML = ""
        updateInfo({ ...student })
    }
    const deleteDesired = (e, i) => {
        student.desired.splice(i, 1);
        e.target.innerHTML = ""
        updateInfo({ ...student })
    }
    const deleteCourse = (e, i) => {
        student.courses.splice(i, 1);
        e.target.innerHTML = ""
        updateInfo({ ...student })
    }
    return (
        <div className="form-container">
            <h1 className="new-student-title">Edit Student</h1>
            <div className="inputs-container">
                <div className="name-input-container">
                    <label className="label">Name
            <input className="input" placeholder={name} onChange={(e) => setName(e.target.value)}></input>
                    </label>
                    <label className="label">Last name
            <input className="input" placeholder={lastName} onChange={(e) => setLastName(e.target.value)}></input>
                    </label>
                </div>
                <div className="skills-courses-container">
                    <div className="skills-container">
                        <h3 className="skills-text">Skills</h3>
                        <div className="select-container">
                            {skills == null && <img className="loader" src="./loader.gif"></img>}
                            {skills != null &&
                                <select ref={skill} className="skills-select">
                                    {skills.map(skill => <option>{skill}</option>)}
                                </select>}
                        </div>
                        <div className="skill-levels">
                            <label className="level-label"> Level
                        <input ref={level} className="level-input" type="number" min="1" max="5"></input>
                            </label>
                        </div>
                        <div className="add-button-container">
                            <Button onClick={(e) => updateSkills(e)} text="add existing" />
                            <Button onClick={(e) => updateSkills(e)} text="add desired" />
                        </div>
                    </div>
                    <div className="courses-container">
                        <div className="top-course-container">
                            <h3 className="courses-text">Courses</h3>
                            {coursesArray == null && <img className="loader" src="./loader.gif"></img>}
                            {coursesArray != null &&
                                <select ref={course} className="courses-select">
                                    {coursesArray.map(course => <option>{course}</option>)}
                                </select>}
                        </div>
                        <div className="course-button-container">
                            <Button onClick={updateCourse} text="add course" />
                        </div>
                    </div>
                </div>
                <div className="preview-container">
                    <h4 className="preview-name">{`${name} ${lastName}`}</h4>
                    <div className="spans-container">{`Existing skills: `}{student.existing.map((exist, i) => <div><span key={i} className="selected"
                        onClick={(e) => deleteExisting(e, i)}>{`${exist.skill}(${exist.level}) `}</span></div>)}</div>
                    <div className="spans-container">{`Desired skills: `}{student.desired.map((desired, i) => <div><span key={i} className="selected"
                        onClick={desired => deleteDesired(desired, i)}>{`${desired.skill}(${desired.level}) `}</span></div>)}</div>
                    <div className="spans-container">{`Courses interested: `}{student.courses.map((course, i) => <div><span key={i} className="selected"
                        onClick={course => deleteCourse(course, i)}>{course}</span></div>)}</div>
                </div>
                <Button onClick={saveUpdate} text="Update Student" />
                <Button onClick={() => history.push('/student')} text="Back" />
            </div>
        </div>
    )
}

export default NewStudent;