import passport from "passport";
import User, { Iuser } from "../models/userModel";
import { Strategy as LocalStratgy } from 'passport-local'



passport.use(

    new LocalStratgy({
        usernameField: "email",
        passwordField: "password"
    },

        async (email: string, password: string, done: any) => {
            const user = await User.findOne({ email })

            if (!user) return done(null, false);

            const isvalid = await user.matchPassword(password)

            if (user && isvalid) {
                return done(null, user)
            } else {
                return done(null, false)
            }
        }
    )
)

passport.serializeUser((user: any, done: any) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err: NativeError, user: Iuser) => done(err, user));
});

export default passport;