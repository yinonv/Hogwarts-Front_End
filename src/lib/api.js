import axios from 'axios'

const url = 'http://127.0.0.1' 
const port = 2700

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
const updateStudent = (student) => {
    return axios.post(`${url}:${port}/students/edit`, JSON.stringify(student))
}


// const url = 'https://hogwarts-students.herokuapp.com'
// const getStudents = () => {
//     return axios.get(`${url}/students`)
// }
// const getSkills = () => {
//     return axios.get(`${url}/skills`)
// }
// const getCourses = () => {
//     return axios.get(`${url}/courses`)
// }
// const addStudent = (student) => {
//     console.log(JSON.stringify(student))
//     return axios.post(`${url}/students/add`, JSON.stringify(student))
// }
// const updateStudent = (student) => {
//     return axios.post(`${url}/students/edit`, JSON.stringify(student))
// }


export { getStudents, getSkills, getCourses, addStudent, updateStudent }
