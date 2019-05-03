const passport = require('passport');

const localStrategy = require("./strategies/local.strategy");
const jwtStrategy = require("./strategies/jwt.strategy");

module.exports = (app) => {
    //For authenticating by local strategy
    passport.use(localStrategy.strategy);

    //For authenticating by jwt strategy
    passport.use(jwtStrategy.strategy);
};