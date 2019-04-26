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

module.exports.strategy = new JwtStrategy(opts, async (jwt_payload, next) => {
    try {
        const user = await User.findOne({username: jwt_payload.username});
        if(user) {
          return next(null, user);
        } else {
          return next(null, false, { message: 'User not found'});
        }
    } catch(err) {
      console.log(`Authentication error: ${err}`);
      // return next(err, false, { message: 'Internal Server Error'});====> USELESS, in this case, only err is recognized
      return next(err);
    }
});