const passport = require('passport');

const localStrategy = require("./strategies/local.strategy");
const jwtStrategy = require("./strategies/jwt.strategy");

module.exports = (app) => {
    //Initialize passport
    //NEEDed only for local strategy WITH SESSION
    //app.use(passport.initialize());

    //For authenticating by local strategy
    passport.use(localStrategy.strategy);
    //to name the strategy rather than default "local": https://scotch.io/tutorials/easy-node-authentication-setup-and-local

    //For authenticating by jwt strategy
    passport.use(jwtStrategy.strategy);
};