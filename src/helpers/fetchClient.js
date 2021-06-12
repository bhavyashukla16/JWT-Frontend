import Axios from 'axios'

const fetchClient = () => {
    const accessToken = localStorage.getItem('token')
    const instance = Axios.create({
        baseUrl: 'https://jwt-login-backend.herokuapp.com/',
    })

    instance.interceptors.request.use(
        config => {
            config.headers['Authorization'] = `Bearer ${accessToken}`
            return config;
        },
        error => {
            return Promise.reject(error)
        }
    )
    return instance;
}

export default fetchClient()
