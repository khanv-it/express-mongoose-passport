const passport = require('passport');

const localStrategy = require("./strategies/local.strategy");
const jwtStrategy = require("./strategies/jwt.strategy");

module.exports = (app) => {
    
    /*
        IMPORTANT NOTE: app.use... & passport... can be with order: 
            app.use... --> passport...  : https://medium.com/@ar7casper/authentication-using-express-js-passport-js-7ae7a7484a55
            or
            passport... --> app.use...  : https://github.com/passport/express-4.x-local-example/blob/master/server.js
    */

    // Initialize Passport and restore authentication state, if any, from the session.
    app.use(passport.initialize());//If jwt, oauth, oauth2 ...(NOT including local) strategies are used without assigning {session: false}: This is needed
    app.use(passport.session());

    //For authenticating by local strategy
    passport.use(localStrategy.strategy);
    //to name the strategy rather than default "local": https://scotch.io/tutorials/easy-node-authentication-setup-and-local

    passport.serializeUser(localStrategy.serializeUser);//If jwt, oauth, oauth2 ...(NOT including local) strategies are used without assigning {session: false}: This is needed

    passport.deserializeUser(localStrategy.deserializeUser);

    //For authenticating by jwt strategy
    passport.use(jwtStrategy.strategy);
};