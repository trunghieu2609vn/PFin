const express = require('express');
var app = express();

//Sử dụng passport
const passport = require('passport');
app.use(passport.initialize()); //Dòng này để thông báo sử dụng passport
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const session = require('express-session');
//và khai báo sử dụng:
app.use(session({
    secret: 'something',
    cookie: {
        maxAge: 1000*60*60*24*30  //đơn vị là milisecond -> 1 tháng
    }
}));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    db.user.findById(id).then(function (user) {
        done(null, user);
    }).catch(function (err) {
        console.log(err);
    })
});

app.use(passport.session());

  passport.use(new LocalStrategy(
    function (username,password,done) {
        db.user.find({where : {
            username : username
        }}).then(function (user) {
            bcrypt.compare(password, user.password, function (err,result) {
                if (err) { return done(err); }
                if(!result) {
                    return done(null, false, { message: 'Incorrect username and password' });
                }
                return done(null, user);
            })
        }).catch(function (err) {
            return done(err);
        })
    }
))

app.get('/secret', (req, res) => {
    if (req.isAuthenticated()) { //trả về true nếu đã đăng nhập rồi
        res.send('Đã đăng nhập');
    } else {
        res.redirect('/login');
    }
})