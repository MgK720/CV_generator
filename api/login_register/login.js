const bcrypt = require('bcrypt');
const { isLoginExists } = require('./register.js')
const LocalStrategy = require("passport-local");
const Pool = require('pg').Pool
require('dotenv').config({ debug: process.env.DEBUG });

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  })

const login = async (req,res) =>{
    
}

const matchPassword = async(password, hashedPassword) =>{
    const result = await bcrypt.compare(password, hashedPassword);
    return result;
}

module.exports = (passport) => {
    passport.use(
      "local-login",
      new LocalStrategy(
        {
          usernameField: "login",
          passwordField: "password",
        },
        async (login, password, done) => {
          try {
            const user = await isLoginExists(login);
            if (!user) return done(null, false);
            const isMatch = await matchPassword(password, user.password);
            console.log(isMatch);
            if (!isMatch) return done(null, false);
            return done(null, {account_id: user.account_id, login: user.login});
          } catch (error) {
            return done(error, false);
          }
        }
      )
    );
  };