import React, {useState} from 'react'
import Axios from '../helpers/fetchClient'
var Loader = require('react-loader');

const AddUserDetails = () => {
    const emptyFormData = {
        username: '',
        mobile_no: '',
        email: '',
        address: ''
    }
    const [detials, setDetials] = useState(emptyFormData)
    const [loading, setLoading] = useState(true)
    const [view, setView] = useState(false)

    const handleChange = (e) => {
      setDetials({
          ...detials,
          [e.target.name]: e.target.value
      })
      //console.log(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(false);
        //Axios.post('https://jwt-login-backend.herokuapp.com/api/addUser', {
        Axios.post('http://localhost:5000/api/addUser', {
        username: detials.username,
        mobile_no: detials.mobile_no,
        email: detials.email,
        address: detials.address
        })
        .then((response) => {
            window.alert(response.data.message)
            if(response.data.message === 'Session expired') {
                window.location = '/';
            }
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(true), setView(true), setDetials(emptyFormData))
    }

    return (
            <div className="container">
            <Loader loaded={loading} width={20} length={40} radius={25} />
            <h1>
                Welcome
            </h1>
            <h5 style={{marginBottom:"20px"}}>Enter your details</h5>
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} pattern="[a-zA-Z0-9_!@#$%^&*]*" title="No spaces allowed" name="username" value={detials.username} placeholder="Username" required/>
                <input onChange={handleChange} pattern="[0-9]{10,10}" title="Mobile no. should only be of 10 digits" name="mobile_no" value={detials.mobile_no} placeholder="Mobile no." required/>
                <input onChange={handleChange} type="email" name="email" value={detials.value} placeholder="e-mail" required/>
                <input onChange={handleChange} name="address" value={detials.address} placeholder="Address" required/>
                <button>Submit</button>
            </form>
            { view && 
            <button onClick={()=> window.location = '/userDetails'} style={{marginTop: "30px", width: "150px"}}>View Details</button>
            }
            </div>
    )
}

export default AddUserDetails
