import axios from 'axios'
import utils from '../../utils'
import history from '../history/history'

const baseAPI = axios.create({
    baseURL: process.env.REACT_APP_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    }
})

console.log(baseAPI)
baseAPI.interceptors.request.use(
    (config) => {
        const token = utils.getToken();
        if()
    }
)