import React, { useEffect, useState, useRef, useContext } from 'react';
import './style.css'
import { getSkills, getCourses, addStudent, updateStudent } from '../../lib/api'
import Button from '../Button'
import { useHistory } from 'react-router-dom'
import { getDate } from '../../tools'
import HogwartsContext from '../../context/HogwartsContext'
import { useAlert, positions } from 'react-alert'
import swal from 'sweetalert';
import UserSkills from '../UserSkills'

function NewStudent(props) {
    const [name, setName] = useState(props.info.name)
    const [lastName, setLastName] = useState(props.info.lastName)
    const student = { ...props.info }
    const studentCopy = { ...props.info }
    const [skills, setSkills] = useState(null)
    const [coursesArray, setCoursesArray] = useState(null)
    const [rangeValue, setRangeValue] = useState(1)
    const skill = useRef(null)
    const level = useRef(null)
    const course = useRef(null)
    const history = useHistory()
    const updateInfo = useContext(HogwartsContext);
    const alert = useAlert()
    const { text, title, type } = props;
    let loader;
    if (type == "new") {
        loader = './loader.gif'
    } else {
        loader = '../loader.gif'
    }
    useEffect(() => {
        displayData()
        level.current.value = 1
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
        const newSkill = { skill: selectedSkill, level: selectedLevel };
        if (text == "add existing") {
            student.existing = [...student.existing, newSkill]
        } else {
            student.desired = [...student.desired, newSkill]
        }
        updateInfo({ ...student }, type)
    }
    const updateCourse = () => {
        const selectedCourse = course.current.value;
        student.courses.push(selectedCourse)
        updateInfo({ ...student }, type)
    }
    const saveUpdate = async () => {
        const settings = { timeout: 2000, position: positions.BOTTOM_CENTER }
        if (name == '' || lastName == '') {
            alert.error("Name is required", settings)
            return;
        }
        student.name = name;
        student.lastName = lastName;
        if (type == "new") {
            student.createDate = getDate()
            const response = await addStudent(student)
            student.desired = [];
            student.courses = [];
            student.existing = [];
            student.name = ''
            student.lastName = ''
            history.push('/')
            alert.success('Student Created', settings)
        } else {
            student.lastUpdate = getDate()
            const response = await updateStudent(student)
            history.push('/student')
            alert.success('Student Updated', settings)
        }
        updateInfo({ ...student }, type)
    }
    const deleteExisting = (e, i) => {
        student.existing.splice(i, 1);
        e.target.innerHTML = ""
        updateInfo({ ...student }, type)
    }
    const deleteDesired = (e, i) => {
        student.desired.splice(i, 1);
        e.target.innerHTML = ""
        updateInfo({ ...student }, type)
    }
    const deleteCourse = (e, i) => {
        student.courses.splice(i, 1);
        e.target.innerHTML = "";
        updateInfo({ ...student }, type)
    }
    const goBack = async () => {
        const answer = await swal("Are you sure you want to discard without saving?", {
            dangerMode: true,
            buttons: true,
        });
        if (answer == null) {
            return
        }
        if (answer && type == "new") {
            studentCopy.desired = [];
            studentCopy.courses = [];
            studentCopy.existing = [];
        }
        history.push('/');
        updateInfo({ ...studentCopy }, type)
    }
    return (
        <div className="form-container">
            <h1 className="new-student-title">{title}</h1>
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
                            {skills == null && <img className="loader" src={loader}></img>}
                            {skills != null &&
                                <select ref={skill} className="skills-select">
                                    {skills.map(skill => <option>{skill}</option>)}
                                </select>}
                        </div>
                        <div className="skill-levels">
                            <div className="range-value">{`Level: ${rangeValue}`}</div>
                            <input ref={level} onChange={(e) => setRangeValue(e.target.value)}
                                className="level-input" type="range" min="1" max="5"></input>
                        </div>
                        <div className="add-button-container">
                            <Button onClick={(e) => updateSkills(e)} text="add existing" />
                            <Button onClick={(e) => updateSkills(e)} text="add desired" />
                        </div>
                    </div>
                    <div className="courses-container">
                        <div className="top-course-container">
                            <h3 className="courses-text">Courses</h3>
                            {coursesArray == null && <img className="loader" src={loader}></img>}
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
                    <UserSkills title={"Existing Skills: "} dataArray={student.existing} callback={(e, i) => deleteExisting(e, i)} />
                    <UserSkills title={"Desired Skills: "} dataArray={student.desired} callback={(e, i) => deleteDesired(e, i)} />
                    <UserSkills title={"Courses: "} dataArray={student.courses} callback={(e, i) => deleteCourse(e, i)} />
                </div>
                <Button onClick={saveUpdate} text={text} />
                <Button onClick={goBack} text="Back" />
            </div>
        </div >
    )
}

export default NewStudent;