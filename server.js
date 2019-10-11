const express = require("express");
const app = express();
const server = app.listen(8000);
const mongoose = require('mongoose');
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.json());

mongoose.connect('mongodb://localhost/1995_api', {
useUnifiedTopology: true,
useNewUrlParser: true,
});

const   UserSchema = new mongoose.Schema({
    name: {type: String}},
    {timestamps: true});

   const User = mongoose.model('User', UserSchema);

app.get('/', (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.json(err));
}) 

app.get('/new/:name/', function (req, res) {
    var user = new User({ name: req.params.name });
    user.save(function (errorsNewMessage) {
        if (errorsNewMessage) {
            res.redirect("/");
        } else {
            console.log('user created', user)
            res.redirect("/");
        }
    });
});

app.get('/remove/:name/', function (req, res) {
    User.findOneAndRemove({name : req.params.name})
    .then(data => {
        console.log('user deleted:', user)
        res.redirect('/');
    })
    .catch(err => {

        res.redirect('/');
    });
});

app.get('/:name/', function (req, res) {
    User.findOne({name : req.params.name})
    .then(users => res.json(users))
    .catch(err => res.json(err));
});