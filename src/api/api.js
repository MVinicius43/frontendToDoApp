import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:3333',
    headers: {
        "Content-Type": "application/json",
    }
})

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getData: () => 
    new Promise((resolve, reject) => {
        instance 
        .get('/tasks')
        .then(response => {
            if (response.status === 200) {
                resolve(response.data)
            } else {
                reject(new Error("CouldNotConnect"))
            }
        })
        .catch(err => {
            reject(err.response || err)
        })
    }),

    sendData: (id, title) => 
    new Promise((resolve, reject) => {
        instance 
        .post('/tasks', {
            id,
            title
        })
        .then(response => {
            if (response.status === 200) {
                resolve(response.data)
            } else {
                reject(new Error("CouldNotConnect"))
            }
        })
        .catch(err => {
            reject(err.response || err)
        })
    }),
}