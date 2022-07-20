const localStrategy = require("passport-local");

const db = require("../db.js");

module.exports = (passport) => {
  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
      },
      async (username, password, done) => {
        try {
          const userExists = await db.User.findOne({ username: username });
          if (userExists) {
            return done(null, false);
          }
          const user = await db.User.create({ username, password });
          return done(null, user);
        } catch (err) {
          done(error);
        }
      }
    )
  );
};
