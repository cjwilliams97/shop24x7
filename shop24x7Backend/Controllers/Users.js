const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const User = require('../models/users')
const dotenv = require('dotenv').config()

const secretkey = process.env.ACCESS_TOKEN_SECRET
// router.use(bodyParser.urlencoded({ extended: false}))
// router.use(bodyParser.json())


// router.post('/register', function(req, res){
//     let hashedPassword = bcrypt.hashSync(req.body.password, 8)


// })
exports.registerUser = (req, res) => {
    console.log("in register user")
    // console.log("test 2")
    let hashedPassword = bcrypt.hashSync(req.body.password, 8)
    // req.body = JSON.stringify(req.body)
    console.log("req.body: " + req.body)
    User.create({
        _id: new mongoose.Types.ObjectId(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
        roleId: 'User',
        phone: 1234567890,
        interests: 'NodeJS, Angular',
        address: ['123 main street', 'New York', 'New York', 12345]
    }).then(result => {
        res.status(200).json({
            user: result,
            message: "Sucessfully created the User"
        })
        // res.send({
        //     "status": "success",
        //     "message": "user created successfully"
        // })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
}


exports.loginUser = (req, res) => {
    User.findOne({email: req.body.email}, (err, user) => {
        if (err) 
            return res.status(500).send("Error on server")
        if (!user) {
            console.log(user)
            return res.status(404).send("User does not exist")
        }
        else {
            const validPassword = bcrypt.compareSync(req.body.password, user.password);
            if (!validPassword) {
                return res.status(401).send("Invalid password")
            }
            //password is valid
            var token = jwt.sign(user.toJSON(), secretkey, {expiresIn: 86400})
            var userData = user.toJSON();
            userData.password = '';
            return res.status(200).json({success:true, token: token, userData: userData})
            }
    })   
}

// exports.updateAddress = (req, res) => {
    
// }
// router.post('/login', function(req, res){
    
// })

// router.get('/', function (req, res){

// })

// login user

//update address



/*************LOWER PRIORITY****************/
//update image
//delete image