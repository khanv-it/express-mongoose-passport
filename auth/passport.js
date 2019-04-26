const passport = require('passport');

const localStrategy = require("./strategies/local");
const jwtStrategy = require("./strategies/jwt");

module.exports = (app) => {
    //Initialize passport
    app.use(passport.initialize());

    //For authenticating by local strategy
    passport.use(localStrategy.strategy);
    //to name the strategy rather than default "local": https://scotch.io/tutorials/easy-node-authentication-setup-and-local

    //For authenticating by jwt strategy
    passport.use(jwtStrategy.strategy);
};