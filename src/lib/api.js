import axios from 'axios'

const server = 'http://127.0.0.1:2700'
//const server = 'https://hogwarts-students.herokuapp.com'

const getStudents = () => {
    return axios.get(`${server}/students`)
}
const getSkills = () => {
    return axios.get(`${server}/skills`)
}
const getCourses = () => {
    return axios.get(`${server}/courses`)
}
const addStudent = (student) => {
    console.log(JSON.stringify(student))
    return axios.post(`${server}/student/add`, JSON.stringify(student))
}
const updateStudent = (student) => {
    return axios.post(`${server}/student/edit`, JSON.stringify(student))
}
const deleteStudent = (id) => {
    return axios.delete(`${server}/student/delete`, { data: { 'id': id } })
}
const getStats = () => {
    return axios.get(`${server}/stats`)
}

export { getStudents, getSkills, getCourses, addStudent, updateStudent, deleteStudent, getStats }
