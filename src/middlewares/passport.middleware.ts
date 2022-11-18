import passport from "passport";
import User from "../models/userModel";
import dotenv from "dotenv"
import { Strategy as LocalStratgy } from 'passport-local'
import GoogleStrategy from 'passport-google-oauth20';

dotenv.config();


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

// this is google

passport.use(
    new GoogleStrategy.Strategy(
        {
            clientID: `${process.env.GOOGLE_CLIENT_ID}`,
            clientSecret: `${process.env.GOOGLE_PRIVATE_SECRET}`,
            callbackURL: '/auth/google/callback',
        },
        async (_accessToken, _refreshToken, profile: any, done: any) => {
            const user = await User.findOne({ email: profile.emails[0].value })

            if (user) {
                user.googleID = profile.id
                user.email_veryfied = true
                await user.save()
            } else {
                await User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    email_veryfied: true,
                    googleID: profile.id
                })

            }

            done(null, user);
        }
    )
);


passport.serializeUser((user: any, done: any) => {
    done(null, user.id);
});

passport.deserializeUser((obj: any, done) => {
    done(null, obj);
});
// passport.deserializeUser((id, done) => {
//     User.findById(id, (err: NativeError, user: Iuser) => done(err, user));
// });

export default passport;