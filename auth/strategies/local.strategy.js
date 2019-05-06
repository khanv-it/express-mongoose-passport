const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../../models/user.model');

module.exports.strategy = new LocalStrategy( 
    //next == done == cb
    async function (username, password, next) {
        try{
            const user = await User.findOne({username});
            if(user) {
                // const isMatch = await bcrypt.compare(password, user.password);
                const isMatch = password == user.password;
                if(isMatch) {
                    return next(null, user, { message: 'Username & Passwor valid' });
                } else {
                    return next(null, false, { message: 'Incorrect password.' });
                }
            } else {
                return next(null, false, { message: 'Incorrect username.'});
            }
        }
        catch(err){
            console.log(`--==-- Authentication error: ${err}`);
            //REF: http://www.passportjs.org/docs/downloads/html/  >> Verify Callback
            // return next(err, false, { message: 'Internal Server Error'});====> USELESS, in this case, only err recognized
            return next(err);
        }
    }
);

module.exports.serializeUser = (user, next) => next(null, user.username);

module.exports.deserializeUser = async (username, next) => {
    try {
        const user = await User.findOne({username});
        
        if(user) {
            return next(null, user);
        } else {
            return next(null, false);//return next(null, null); ??
        }
    } catch(err) {
        console.log(`deserializeUser error: ${err}`);
        //REF: http://www.passportjs.org/docs/downloads/html/  >> Verify Callback
        // >> Sessions
        return next(err, false);
        // return next(err, false, { message: 'Internal Server Error'});
        // return next(err, user);//as user is a falsy
        // return next(null, false);        
    }
};