import axios from "axios";
const baseUrl = "http://localhost:3001/phonebook"

const getAll = () => {
    return axios.get(baseUrl).then(response => response.data);
}

const addUser = (dataObject) => {
    return axios.post(baseUrl, dataObject).then(response => response.data);
}

const updateUser = (dataId, dataObject) => {
    return axios.put(`${baseUrl}/${dataId}`, dataObject).then(response => response.data);
}

const deleteUser = (dataId) => {
    return axios.delete(`${baseUrl}/${dataId}`).then(response => response.data);
}


export default {
    getAll,
    addUser,
    updateUser,
    deleteUser
}