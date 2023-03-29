import express from 'express';
import routes from './src/routes/crmRoute.js';
import config from './config.js'
import mongoose, { connect } from 'mongoose';
import bodyParser from 'body-parser';
import jsonwebtoken from 'jsonwebtoken';
// import * as MongoClient from 'mongodb';


const app = express();
const PORT = config.port;
const MONGODB_URI = config.mongodb_uri;
const DATABASE_NAME = config.database_name;
const DATABASE_CONNECTION = `${MONGODB_URI}/${DATABASE_NAME}`

mongoose.set('strictQuery', true);
/// mongoose connection ///
mongoose.Promise = global.Promise;
mongoose.connect(DATABASE_CONNECTION,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, client) => {
    if (err){
        console.error(err);
    }
    console.log('connect to mongo successfully');
});


/// body-parser setup ///
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())


/// JWT setup ///
app.use((req, res, next) => {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', (err, decode) => {
            if (err) req.user = undefined;
            req.user = decode;
            next();
        });
    } else {
        req.user = undefined;
        next();
    }
});


routes(app);
app.get('/', (req, res) => {
    res.send(`<h3>Node and express server is running on prot:${PORT}</h3>`);
});

app.listen(PORT, () => {
    console.log(`server is running go to ${config.server_uri}`);
});