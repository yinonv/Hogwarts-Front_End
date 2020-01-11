import React, { useEffect, useState, useRef } from 'react';
import './style.css'
import { getSkills, getCourses, addStudent } from '../../lib/api'
import Button from '../Button/'
import { useHistory } from 'react-router-dom'
import { getDate } from '../../tools'

function NewStudent() {
    const [skills, setSkills] = useState(null)
    const [courses, setCourses] = useState(null)
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [existingSkills, setExistingSkills] = useState('')
    const [desiredSkills, setDesiredSkills] = useState('')
    const [courseList, setCourseList] = useState('')
    const [student, setStudent] = useState({
        existing: [],
        desired: [],
        courses: [],
    })
    const skill = useRef(null)
    const level = useRef(null)
    const course = useRef(null)
    const history = useHistory()

    useEffect(() => {
        displayData()
    }, []);
    const displayData = async () => {
        const skillsResponse = await getSkills();
        const coursesResponse = await getCourses();
        setCourses(coursesResponse.data)
        setSkills(skillsResponse.data)
    }
    const updateSkills = (e) => {
        const text = e.target.innerHTML;
        const selectedSkill = skill.current.value;
        const selectedLevel = level.current.value;
        if (text == "add existing") {
            let temp = student;
            temp.existing.push({ skill: selectedSkill, level: selectedLevel })
            setStudent(temp)
            setExistingSkills(`${existingSkills} ${selectedSkill}(${selectedLevel}), `)
        } else {
            let temp = student;
            temp.desired.push({ skill: selectedSkill, level: selectedLevel })
            setDesiredSkills(`${desiredSkills} ${selectedSkill}(${selectedLevel}), `)
            setStudent(temp)
        }
    }
    const updateCourse = () => {
        let temp = student;
        const selectedCourse = course.current.value;
        temp.courses.push(selectedCourse)
        setCourseList(`${courseList} ${selectedCourse}, `)
        setStudent(temp);
    }
    const createStudent = async () => {
        let temp = student;
        temp.name = name;
        temp.lastName = lastName;
        temp.createDate = getDate()
        temp.id = 1
        setStudent(temp);
        const response = await addStudent(temp)
    }
    return (
        <div className="form-container">
            <h1 className="new-student-title">New Student</h1>
            <div className="inputs-container">
                <div className="name-input-container">
                    <label className="label">Name
            <input className="input" placeholder="name" onChange={(e) => setName(e.target.value)}></input>
                    </label>
                    <label className="label">Last name
            <input className="input" placeholder="Last name" onChange={(e) => setLastName(e.target.value)}></input>
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
                            {courses == null && <img className="loader" src="./loader.gif"></img>}
                            {courses != null &&
                                <select ref={course} className="courses-select">
                                    {courses.map(course => <option>{course}</option>)}
                                </select>}
                        </div>
                        <div className="course-button-container">
                            <Button onClick={updateCourse} text="add course" />
                        </div>
                    </div>
                </div>
                <div className="preview-container">
                    <h4 className="preview-name">{`${name} ${lastName}`}</h4>
                    <div>{`Existing skills: ${existingSkills}`}</div>
                    <div>{`Desired skills: ${desiredSkills}`}</div>
                    <div>{`Courses interested: ${courseList}`}</div>
                </div>
                <Button onClick={createStudent} text="Create Student" />
                <Button onClick={() => history.push('/')} text="Back" />
            </div>
        </div>
    )
}

export default NewStudent;