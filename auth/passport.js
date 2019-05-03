const passport = require('passport');

const localStrategy = require("./strategies/local.strategy");
const jwtStrategy = require("./strategies/jwt.strategy");

module.exports = (app) => {
    //Initialize passport
    /*
        If jwt, oauth, oauth2 ...(NOT including local) strategies are used without assigning {session: false}: This is needed
    */
    //app.use(passport.initialize());

    //For authenticating by local strategy
    passport.use(localStrategy.strategy);
    //to name the strategy rather than default "local": https://scotch.io/tutorials/easy-node-authentication-setup-and-local

    /*
        If jwt, oauth, oauth2 ...(NOT including local) strategies are used without assigning {session: false}: This is needed
    */
    //passport.serializeUser(localStrategy.serializeUser);

    // passport.deserializeUser(localStrategy.deserializeUser);

    //For authenticating by jwt strategy
    passport.use(jwtStrategy.strategy);
};