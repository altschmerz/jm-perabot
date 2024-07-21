import bcrypt from "bcrypt";
import passport from "passport";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import { IncorrectPasswordError } from "../../errors/auth.error";
import { UserNotFound } from "../../errors/user.error";
import User from "../../models/User";

passport.use(
  "login",
  new LocalStrategy(async function (username, password, done) {
    try {
      const user = await User.findOne({ where: { username } });
      if (!user) UserNotFound({ attribute: "username", value: username });

      const isPasswordMatch = await bcrypt.compare(password, user.passwordHash);
      if (!isPasswordMatch) IncorrectPasswordError();

      return done(null, user);
    } catch (error) {
      done(error);
    }
  })
);

passport.use(
  new JWTStrategy(
    {
      secretOrKey: process.env.SECRET_SIGNER,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async function (payload, done) {
      try {
        return done(null, payload.user);
      } catch (error) {
        done(error);
      }
    }
  )
);
