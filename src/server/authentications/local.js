/**
 * Created by Manhhailua on 10/28/16.
 */

import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { compareSync } from 'bcrypt';
import { User } from '../../data/models';

passport.use(new LocalStrategy({
  usernameField: 'email',
  passReqToCallback: true,
  session: false,
}, (req, email, password, done) => {
  User.findOne({ where: { email } }).then(user => {
    if (!user) {
      return done(null, false);
    }

    if (!compareSync(password, user.password)) {
      return done(null, false);
    }

    if (req.body.rememberMe) {
      console.log('req.body.rememberMe: ', req.body.rememberMe);
    }

    return done(null, {
      id: user.id,
      email: user.email,
    });
  });
}));

export default passport;
