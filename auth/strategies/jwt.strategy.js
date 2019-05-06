const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const jwtConfig      = require('../../config/default').authentication.jwt;

const User = require('../../models/user.model');

const opts = {
  secretOrKey: jwtConfig.secret,
  jwtFromRequest: ExtractJwt.fromExtractors([
    //Authorization: eyJhbGciOiJIUzI1NiIs....
    ExtractJwt.fromHeader('Authorization'),
    //Authorization: JWT eyJhbGciOiJIUzI1NiIs....
    ExtractJwt.fromAuthHeaderWithScheme('JWT'),
    ExtractJwt.fromBodyField('Authorization'),
    //Authorization: Bearer eyJhbGciOiJIUzI1NiIs....
    ExtractJwt.fromAuthHeaderAsBearerToken()
  ])
};

module.exports.strategy = new JwtStrategy(opts, async (jwtPayload, next) => {
    try {
        //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
        //REF: https://medium.com/front-end-weekly/learn-using-jwt-with-passport-authentication-9761539c4314
        const user = await User.findOne({username: jwtPayload.username});

        if(user) {
          return next(null, user);
          /*
          If {session: true}, example: 
            router.get('/testJWTNoSession', passport.authenticate('jwt',{session: true}), prodContr.test);
            router.get('/testJWTNoSession', passport.authenticate('jwt'), prodContr.test);
          ==> This will call serializeUser 
          
          If {session: false}, example: 
            router.get('/testJWTNoSession', passport.authenticate('jwt',{session: false}), prodContr.test);
          ==> serializeUser will NOT be called
          */
        } else {
          return next(null, false, { message: 'User not found'});
        }
    } catch(err) {
      console.log(`Authentication error: ${err}`);
      // return next(err, false, { message: 'Internal Server Error'});====> USELESS, in this case, only err is recognized
      return next(err);
    }
});