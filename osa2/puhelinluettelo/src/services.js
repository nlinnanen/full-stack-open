import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => {
    console.log('Get', baseUrl)
    return axios
        .get(baseUrl)
        .then(response => response.data)
}

const create = newObject => {
    return axios
        .post(baseUrl, newObject)
        .then(response => response.data)
        
}

const remove = id => {
    return axios
        .delete(`${baseUrl}/${id}`)
}

const update = newObject => {
    return axios
            .put(`${baseUrl}/${newObject.id}`, newObject)
            .then(response => response.data)
} 

export default { getAll, create, remove, update }