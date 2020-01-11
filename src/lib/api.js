import axios from 'axios'

const url = 'http://localhost'
const port = 2600

const getStudents = () => {
    return axios.get(`${url}:${port}/students`)
}
const getSkills = () => {
    return axios.get(`${url}:${port}/skills`)
}
const getCourses = () => {
    return axios.get(`${url}:${port}/courses`)
}
const addStudent = (student) => {
    console.log(JSON.stringify(student))
    return axios.post(`${url}:${port}/students/add`, JSON.stringify(student))
}
export { getStudents, getSkills, getCourses, addStudent }
