require('dotenv').config()

const express = require('express')
const app = express();
const jwt = require('jsonwebtoken')
const mysql = require('mysql')
const cors = require('cors')
const db = require('./db')
const bodyParser = require('body-parser')

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));

const users = [
    {
    email: "bhavya@email.com",
    password: "password"
},
{
    email : "admin@namasys.co",
    password: "admin123"
}
];

app.post('/', async (req, res) => {
    const user = users.find(user => user.email === req.body.email)
    if(!user) {
        return res.json({
            success: 0,
            message: 'Cannot find User'
        })
    }
    try {
       if( req.body.password === user.password){
           const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: 300});
           //req.session.user = user;
           res.json({ 
                success: 1,
                message: 'Login Successful',
                accessToken: accessToken
            })
           console.log('Login Successful!')
       } else {
           res.json({
            success: 0,
            message: 'Invalid Password'
        })
       }
    } catch {
        res.status(500).json({
            success: 0,
            message: 'Invalid Credentials'
        });
    }
})

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1] //cause the format will be as- Bearer token
    if(!token) {
        //res.status(401);
        return res.json({
            success: 0,
            message: 'Token undefined'
        });
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) {
            //res.status(403);
            return res.json({
                success: 0,
                message: 'Session expired'
            });
        }
        req.user = user;
        next();
    })
}

app.post('/api/addUser', authenticateToken, (req, res) => {
    const {username, mobile_no, email, address} = req.body;
    let sql = 'INSERT INTO user_details (username, mobile_no, email, address) VALUES (?,?,?,?)';
    db.query(sql, [username, mobile_no, email, address], (err, result) => {
        if(err) {
            throw err;
        }
        console.log(result);
        //res.status(200).
        res.json({
            success: 1,
            message: 'User Added Successfully'
        });
    })
});

app.get('/api/userDetails', authenticateToken, (req, res) => {
    let sql = 'SELECT user_id, username, mobile_no, email, address FROM user_details';
    db.query(sql, (err, result) => {
        if(err) {
            throw err;
        }
        console.log(result);
        res.send(result);
    })
})

app.post('/api/deleteUser', (req, res) => {
    const { id } = req.body;
    let sql = 'DELETE FROM user_details WHERE user_id=?';
    db.query(sql, [id], (err, result) => {
        if(err){
            throw err;
        }
        console.log(result);
        res.status(200).json({
            success: 1,
            message: 'User deleted Successfully'
        });
    })
})

app.listen(5000, () => {
    console.log('listening on port 5000');
});