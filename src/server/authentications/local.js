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
}, async(req, email, password, done) => {
  // Find user by email
  const user = await User.findOne({ where: { email } });

  if (!user) {
    return done(null, false);
  }

  if (!compareSync(password, user.password)) {
    return done(null, false);
  }

  const profile = await user.getProfile();

  return done(null, {
    id: user.id,
    email: user.email,
    profile: {
      displayName: profile.displayName,
    },
  });
}));

export default passport;
