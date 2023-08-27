const fs = require('fs');
const Pool = require('pg').Pool
require('dotenv').config({ debug: process.env.DEBUG});

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})

const runDrop = async () => {
    try{
        const drop = fs.readFileSync("./database/db/drop_db.sql", "utf8");
        console.log('RUN: "../database/db/drop_db.sql')
        await dbClient.query(drop);
        console.log("DONE");
    }catch(e){
        throw e;
    }
}

const runCreate = async () => {
    try{
        const create = fs.readFileSync("./database/db/create_db.sql", "utf8");
        console.log('RUN: "../database/db/create_db.sql')
        await dbClient.query(create);
        console.log("DONE")
    }catch(e){
        throw e;
    }
}


const runPreInsert = async () =>{
    try{
        const preInsert = fs.readFileSync("./database/db/pre_insert.sql", "utf8")
        console.log('RUN: "../database/db/pre_insert.sql')
        await dbClient.query(preInsert);
        console.log("DONE")
    }catch(e){
        throw e;
    }
}


const runTrigger = async () => {
    try{
        const trigger = fs.readFileSync("./database/db/trigger.sql", "utf8")
        console.log('RUN: "../database/db/trigger.sql')
        await dbClient.query(trigger);
        console.log("DONE")
    }catch(e){
        throw e;
    }
}

module.exports = {
    runDrop,
    runCreate,
    runPreInsert,
    runTrigger
}