const passport                 = require('passport');
const jwt            = require('jsonwebtoken');

const jwtConfig      = require('../config/default.json').authentication.jwt;

//post
//REF: http://www.passportjs.org/docs/downloads/html/   
//>> Custom Callback
exports.genJWTFromUsernamePass = function (req, res, next) {

    passport.authenticate(
        'local', 
        //pass {session: false} in passport options, so that it wont save the user in the session. (https://medium.com/front-end-weekly/learn-using-jwt-with-passport-authentication-9761539c4314)
        //==> {session: true} WILL NOT cause an error when no session lib is used by express. Therefore, in the case of not using session, the following line can be omit (let {session: true} by default)
        // {session: false},
        //here: the next param in LocalStrategy
        (err, user, info) => {
            //System Error: in this case, only err is available
            if(err){
                return res.status(400).json({
                    message: "INTERNAL SERVER ERROR",
                    token: null
                });
            }

            //User Error
            if(!user){
                return res.status(400).json({
                    message: info.message,
                    token: null
                });
            }

            //OK
            // generate a signed json web token with the contents of user object and return it in the response
            const payload = {username: user.username};
            const jwtSecret = jwtConfig.secret;
            const jwtOpt = jwtConfig.options;
            //CAN NOT USE user (as it a mongoose object with methods)
            const token = jwt.sign(payload, jwtSecret, jwtOpt);
            
            return res.json({
                message: "token generated successfully", 
                token
            });

        })(req, res, next);//REMEMBER TO ADD THIS
};