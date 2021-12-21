const Order = require('../models/Orders')
const dotenv = require('dotenv').config()
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const Orders = require('../models/Orders')

exports.submitOrder = (req, res) => {
    const headers = req.headers;
    var token = "";
    if (!headers) {
        console.log("no headers included in request")
        return res.status(400).send("No headers were included in the request.")
    }
    const authHeader = headers.authorization;
    if (!authHeader) {
        console.log("No Authorization header was included in the request")
        return res.status(400).send("No Authorization header was included in the request.")
    }  
    if (authHeader.startsWith("Bearer ")) {
        token = authHeader.substring( 7, authHeader.length);
    }
    else {
        console.log("Authorization header is not a bearer token")
        console.log(authHeader)
        return res.status(400).send("Authorization header is not a bearer token.")
    }
    secretkey = process.env.ACCESS_TOKEN_SECRET
    jwt.verify(token, secretkey, (err, decodedUserInfo) => {
        if (err)
            return res.status(401).send("Failed to authenticate token")
        //user has a valid token, complete request
        var newOrder = new Order(req.body);
        newOrder._id = new mongoose.Types.ObjectId();
        newOrder.date = Date();
        console.log(newOrder.toString())
        Order.create(newOrder)
        .then (
            dbresp => {
                console.log("order created for " + decodedUserInfo._id);
                return res.status(200).json({success: "Order created successfully"})
            }
        )
        .catch (
            err => {
                console.log(err)
                return res.status(500).send("Error creating order")
            }
        )
    })


}
exports.getAllOrders = (req, res) => {
    console.log("getAllOrders()")
    const headers = req.headers;
    var token = "";
    if (!headers) {
        console.log("no headers included in request")
        return res.status(400).send("No headers were included in the request.")
    }
    const authHeader = headers.authorization;
    if (!authHeader) {
        console.log("No Authorization header was included in the request")
        return res.status(400).send("No Authorization header was included in the request.")
    }  
    if (authHeader.startsWith("Bearer ")) {
        token = authHeader.substring( 7, authHeader.length);
    }
    else {
        console.log("Authorization header is not a bearer token")
        console.log(authHeader)
        return res.status(400).send("Authorization header is not a bearer token.")
    }
    secretkey = process.env.ACCESS_TOKEN_SECRET
    jwt.verify(token, secretkey, (err, decodedUserInfo) => {
        if (err)
            return res.status(401).send("Failed to authenticate token")
        //user has a valid token, complete request
       
        if (decodedUserInfo.roleId != 'administrator') {
            return res.status(403).json({error: "Requesting user does not have administrator privleges", userInfo: decodedUserInfo})
        }
        Order.find()
        .then (
            dbresp => {
                console.log("All orders received");
                return res.status(200).json(dbresp)
            }
        )
        .catch (
            err => {
                console.log(err)
                return res.status(500).send("Error getting all orders")
            }
        )
    })
}
exports.getOrdersForId = (req, res) => {
    const headers = req.headers;
    var token = "";
    if (!headers) {
        console.log("no headers included in request")
        return res.status(400).send("No headers were included in the request.")
    }
    const authHeader = headers.authorization;
    if (!authHeader) {
        console.log("No Authorization header was included in the request")
        return res.status(400).send("No Authorization header was included in the request.")
    }  
    if (authHeader.startsWith("Bearer ")) {
        token = authHeader.substring( 7, authHeader.length);
    }
    else {
        console.log("Authorization header is not a bearer token")
        return res.status(400).send("Authorization header is not a bearer token.")
    }
    secretkey = process.env.ACCESS_TOKEN_SECRET
    jwt.verify(token, secretkey, (err, decodedUserInfo) => {
        if (err)
            return res.status(401).send("Failed to authenticate token")
        //user has a valid token, complete request
       
        Order.find({userId: decodedUserInfo._id})
        .then (
            dbresp => {
                console.log("user " + decodedUserInfo._id + " orders received");
                console.log(dbresp)
                return res.status(200).json(dbresp)
            }
        )
        .catch (
            err => {
                console.log(err)
                return res.status(500).send("Error getting all orders")
            }
        )
    })
}
exports.processOrderById = (req, res) => {
    console.log("processOrderById")
    const headers = req.headers;
    var token = "";
    if (!headers) {
        console.log("no headers included in request")
        return res.status(400).send("No headers were included in the request.")
    }
    const authHeader = headers.authorization;
    if (!authHeader) {
        console.log("No Authorization header was included in the request")
        return res.status(400).send("No Authorization header was included in the request.")
    }  
    if (authHeader.startsWith("Bearer ")) {
        token = authHeader.substring( 7, authHeader.length);
    }
    else {
        console.log("Authorization header is not a bearer token")
        console.log(authHeader)
        return res.status(400).send("Authorization header is not a bearer token.")
    }
    secretkey = process.env.ACCESS_TOKEN_SECRET
    jwt.verify(token, secretkey, (err, decodedUserInfo) => {
        if (err)
            return res.status(401).send("Failed to authenticate token")
        //user has a valid token, complete request
       
        if (decodedUserInfo.roleId != 'administrator') {
            return res.status(403).json({error: "Requesting user does not have administrator privleges", userInfo: decodedUserInfo})
        }
        //User is authenticated and an administrator
        const filter = {_id: req.body.orderId}
        const update = {delivered: true}
        Order.findOneAndUpdate(filter, update)
        .then ( 
            () => {
                return res.status(200).json({msg: "Update successful"})
            }
        )
        .catch ( 
            err => {
                return res.status(500).json({msg: "Error processing order", error: err})
            }
        )
    })
}
exports.deleteOrderById = (req, res) => {
    console.log("deleteOrderById")
    const headers = req.headers;
    var token = "";
    if (!headers) {
        console.log("no headers included in request")
        return res.status(400).send("No headers were included in the request.")
    }
    const authHeader = headers.authorization;
    if (!authHeader) {
        console.log("No Authorization header was included in the request")
        return res.status(400).send("No Authorization header was included in the request.")
    }  
    if (authHeader.startsWith("Bearer ")) {
        token = authHeader.substring( 7, authHeader.length);
    }
    else {
        console.log("Authorization header is not a bearer token")
        console.log(authHeader)
        return res.status(400).send("Authorization header is not a bearer token.")
    }
    secretkey = process.env.ACCESS_TOKEN_SECRET
    jwt.verify(token, secretkey, (err, decodedUserInfo) => {
        if (err)
            return res.status(401).send("Failed to authenticate token")
        if (decodedUserInfo.roleId != 'administrator') {
            return res.status(403).json({error: "Requesting user does not have administrator privleges", userInfo: decodedUserInfo})
        }
        const filter = {_id: req.body.orderId}
        console.log(filter)
        Orders.deleteOne(filter)
        .then ( 
            () => {
                return res.status(200).json({msg: "Delete successful"})
            }
        )
        .catch ( 
            err => {
                return res.status(500).json({msg: "Error deleting order", error: err})
            }
        )
        //user has a valid token and is an administrator, complete request

    })
}