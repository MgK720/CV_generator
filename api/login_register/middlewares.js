const Pool = require('pg').Pool
const express = require('express')
const app = express()
require('dotenv').config({ debug: process.env.DEBUG });
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  })
  
function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
}
//TODO RENAME THIS FUNCTIONS + MAKE MORE IQ ONES
async function cvOwnership(req,res,next){  // for buttons(update,delete) in /cv/:id
    if(req.user){
        const login = req.user.login;
        const id = req.params.id;
        const cvAssignedToAccount = await pool.query('Select cv_id from account where login=$1', [login]);
        if(cvAssignedToAccount.rows[0].cv_id == id){
            res.locals.isOwner = true;
            next();
        }else{
            res.locals.isOwner = false;
            next();
        }
    }else{
        res.locals.isOwner = false;
        next();
    }
}

async function isOwner(req,res,next){ //for routes: /cv/:id/update, /cv/:id/delete
    const login = req.user.login;
    const id = req.params.id;
    const cvAssignedToAccount = await pool.query('Select cv_id from account where login=$1', [login]);
    if(cvAssignedToAccount.rows[0].cv_id == id){
        next();
    }else{
        res.redirect('/home') //tutaj redirect to homepage
    }
}

async function hasCvAlready(req,res,next){ // for route: /
    console.log(`hasCV = ${await hasCv(req)}`);
    if(await hasCv(req) == false){
        next()
    }else{
        res.redirect('/home')// tutaj redirect to home page
    }
}
async function hasCv(req){ //for route: /cv
    if(req.user){
        const login = req.user.login;
        const hasCv = await pool.query('Select cv_id from account where login=$1', [login]);
        console.log(hasCv.rows[0].cv_id);
        if(hasCv.rows[0].cv_id === null){
            return false;
        }else{
            return true;
        }
    }
}
async function setLocalCvId(req,res,next){
    if(req.user){
        const login = req.user.login;
        const hasCv = await pool.query('Select cv_id from account where login=$1', [login]);
        res.locals.cv_id = hasCv.rows[0].cv_id;
        next();
    }else{
        next();
    }
}
function goHome(req,res,next){
    if (req.user) {
        res.redirect('/home'); //redirect to home page
    }else{
        next();
    }
}
//TODO index.js w folderze api, żebym mógł jednym require uzyc wszystkich metod z api
module.exports = {
    loggedIn,
    goHome,
    cvOwnership,
    isOwner,
    hasCvAlready,
    hasCv,
    setLocalCvId
}
