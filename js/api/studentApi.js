/**
 * with many methods like: 
 * 🙏 get all -> get url
 * 🙏 get by id -> url/id
 * 🙏 add -> data --> .post(data)
 * 🙏 update --> data --> patch-> id
 * 🙏 remove --> url/id 
 * 
 */

import axiosCilent from "./axiosCilent"

export function getAllStudents(params) {

    const url = '/students'
    return axiosCilent.get(url, { params },)

}
export function getStudentById(id) {
    const url = `/students/${id}`
    return axiosCilent.get(url)
}
export function addNewStudent(data) {
    const url = '/students'
    return axiosCilent.post(url, data)
}
export function updateStudent(data) {
    const url = `/students/${data.id}`
    return axiosCilent.patch(url, data)
}
export function removeStudent(id) {
    const url = `/students/${id}`
    return axiosCilent.delete(url)
}


