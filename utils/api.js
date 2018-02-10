import axios from 'axios'
let api
try {
  api = require('../env.json').api
} catch (e) {
  api = require('../env.example.json').api
}

const createInstance = (headers) => {
  return axios.create({
    baseURL: api,
    headers
  })
}

const handleResponse = res => res.data ? Promise.resolve(res) : Promise.reject(res)

const catchError = err => Promise.reject(err.message)

export default {
  get: (path, headers = {}) => (
    createInstance(headers)
      .get(path)
      .then(handleResponse)
      .catch(catchError)
  ),
  post: (path, body = {}, headers = {}) => (
    createInstance(headers)
      .request({
        url: path,
        method: 'POST',
        data: body
      })
      .then(handleResponse)
      .catch(catchError)
  ),
  put: (path, body = {}, headers = {}) => (
    createInstance(headers)
      .request({
        url: path,
        method: 'PUT',
        data: body
      })
      .then(handleResponse)
      .catch(catchError)
  )
}
