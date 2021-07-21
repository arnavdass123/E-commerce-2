const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const bcrypt = require('bcrypt')

function init(passport) {
    passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        //  login
        // check if email exist
        const user = await User.findOne({ email: email })

        if (!user) {
            return done(null, false, { message: 'no user with this email' })
        }

        // comparing password:
        bcrypt.compare(password, user.password).then(match => {
            if (match) {
                return done(null, user, { message: 'Logged in success fully' })
            }

            return done(null, false, { massage: 'worng user name or password' })

        }).catch(err => {
            return done(null, false, { massage: 'something went worng' })
        })
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user)
        })
    })
}

module.exports = init