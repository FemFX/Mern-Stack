const express    = require('express');
const app        = express();
const cors       = require('cors');
const mongoose   = require('mongoose');
const bodyParser = require('body-parser');
const PORT       = process.env.PORT || 5000;
require('dotenv').config();
 
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const uri = 'mongodb://localhost:27017/Mern';
mongoose.connect(uri, { useNewUrlParser : true, useCreateIndex : true });
 
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log('Connection successfully');
})

const exercisesRouter = require('./routes/exercises');
const usersRouter     = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

