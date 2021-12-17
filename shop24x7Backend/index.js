const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./Routes/server');
const app = express()
const port = 3000

const mongoAtlasUrl = 'mongodb+srv://system:123@cluster0.tcn8m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'


// app.use(cors())
app.use(cors({origin: true}))
// app.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', '*');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });



app.use('/', routes)
mongoose.connect(
    mongoAtlasUrl,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(success => {
    console.log('Connected to MongoDB Atlas !');

    app.listen(port, (err) => {
        if (err) {
            console.log("Error : " + err);
        } else {
            console.log(`Server up and running on port ${port}`);
        }
    });

}).catch(err => {
    console.log('Error connecting to MongoDb Atlas ! ' + err);
});

// app.listen(port, function(){
//     console.log('Api is running on port ' + port)
// })
