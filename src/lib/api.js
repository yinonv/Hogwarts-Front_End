import axios from 'axios'

const localhost = 'http://127.0.0.1:2700'
//const herokuServer = 'https://hogwarts-students.herokuapp.com'

const getStudents = () => {
    return axios.get(`${localhost}/students`)
}
const getSkills = () => {
    return axios.get(`${localhost}/skills`)
}
const getCourses = () => {
    return axios.get(`${localhost}/courses`)
}
const addStudent = (student) => {
    console.log(JSON.stringify(student))
    return axios.post(`${localhost}/student/add`, JSON.stringify(student))
}
const updateStudent = (student) => {
    return axios.post(`${localhost}/student/edit`, JSON.stringify(student))
}
const deleteStudent = (id) => {
    return axios.delete(`${localhost}/student/delete`, { data: { 'id': id } })
}

export { getStudents, getSkills, getCourses, addStudent, updateStudent, deleteStudent }
