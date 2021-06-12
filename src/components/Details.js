import React, {useEffect, useState} from 'react'
import Axios from '../helpers/fetchClient'
var Loader = require('react-loader');

const Details = () => {

    const [usersList, setUsersList] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(false);
        Axios.get('http://localhost:5000/api/userDetails')
        .then((response) => {
            if(response.data.success === 0) {
                window.alert(response.data.message)
                if(response.data.message === 'Session expired') {
                    window.location = '/';
            }}
            else {
            setUsersList(response.data);
            }
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(true))
    }, []);

    const handleDelete = (id) => {
        setLoading(false);
        Axios.post('http://localhost:5000/api/deleteUser', {
        id: id
        })
        .then((response) => {
            if(response.data.success === 0) {
                window.alert(response.data.message)
                if(response.data.message === 'Session expired') {
                    window.location = '/';
            }}
            else {
            setUsersList(usersList.filter(user => user.user_id!==id ))
            }
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(true))
    }

    return (
        <div className="container">
        <Loader loaded={loading} width={20} length={40} radius={25} />
            <h1>User Details</h1>
            <table style={{width: "70vw", margin: "40px auto"}} className="table table-striped table-dark">
            <thead>
                <tr>
                <th scope="col">User Id</th>
                <th scope="col">Username</th>
                <th scope="col">Mobile No.</th>
                <th scope="col">e-mail</th>
                <th scope="col">Address</th>
                <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
            {usersList.map(user => 
                <tr key={user.user_id}>
                <th scope="row">{user.user_id}</th>
                <td>{user.username}</td>
                <td>{user.mobile_no}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td onClick={() => {
                          if (window.confirm("Are You Sure?")) {
                            handleDelete(user.user_id)
                          }
                        }}><i className="far fa-trash-alt"></i></td>
                </tr>
                )}
            </tbody>
            </table>
        </div>
    )
}

export default Details
