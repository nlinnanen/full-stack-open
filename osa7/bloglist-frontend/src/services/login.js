import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  console.log(response)
  if(response.status === 401) {
    console.log('here')
    throw 'Invalid user'
  }
  return response.data
}
// eslint-disable-next-line
export default { login }