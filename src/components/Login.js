import React, {useState} from 'react'
import Axios from 'axios'
var Loader = require('react-loader');

const Login = () => {
  //const [loginStatus, setLoginStatus] = useState(false)
  const [loading, setLoading] = useState(true)
  const [credentials, setCredentials] = useState({
      email: '',
      password: ''
  })

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
        [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(false);
    Axios.post('https://jwt-login-backend.herokuapp.com/', {
      email: credentials.email,
      password: credentials.password
    })
    .then((response) => {
      if(response.data.success === 0) {
        window.alert(response.data.message)
      } else {
      //setLoginStatus(true)
      localStorage.setItem('token', response.data.accessToken)
      window.location = '/addUser'
      }
    })
    .finally(() => { 
      setLoading(true); 
      setCredentials({
      email: '',
      password: ''
    })
    })
  }


  return (
    <div className="container">
    <Loader loaded={loading} width={20} length={40} radius={25} />
      <h1>
        Bonjour!
      </h1>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} type="email" name="email" placeholder="e-mail" value={credentials.email} required/>
        <input onChange={handleChange} type="password" name="password" placeholder="password" value={credentials.password} required/>
        <button>Login</button>
      </form>
    </div>
  )
}

export default Login
