import axios from 'axios'

const createInstance = () => (
  axios.create({
    baseURL: 'http://localhost:5000/api/v1',
    headers: {
      'x-access-token': ''
    }
  })
)

const handleResponse = res => res.data ? Promise.resolve(res) : Promise.reject(res)

const catchError = err => Promise.reject(err)

export default {
  get: path => (
    createInstance()
      .get(path)
      .then(handleResponse)
      .catch(catchError)
  ),
  post: (path, body = {}, headers = {}) => (
    createInstance()
      .request({
        url: path,
        method: 'POST',
        headers,
        data: body
      })
      .then(handleResponse)
      .catch(catchError)
  ),
  put: (path, body = {}) => (
    createInstance()
      .request({
        url: path,
        method: 'PUT',
        data: body
      })
      .then(handleResponse)
      .catch(catchError)
  )
}
