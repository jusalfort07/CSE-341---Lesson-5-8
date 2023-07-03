const passport = require('passport');
const dotenv = require('dotenv');
dotenv.config();

const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://ortega-cse341-lesson-5-8.onrender.com/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

passport.serializeUser(function (user, done){
  done(null, user)
});

passport.deserializeUser(function (user, done){
  done(null, user)
});