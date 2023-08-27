const {runDrop, runCreate, runTrigger, runPreInsert} = require('./api/run_database_methods.js')
const Pool = require('pg').Pool
require('dotenv').config({ debug: process.env.DEBUG});

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})

//IMPORTANT!!! YOU MUST HAVE ALREADY DATABASE - MAKE CONNECTION WITH YOUR DB PREVIOUSLY. 
//MAKE .env CONFIGURATION 


const runDatabase = async () => {
    dbClient = await pool.connect();

    await runDrop();
    await runCreate();
    await runTrigger();
    await runPreInsert();
    console.log("---------EVERYTHING DONE---------")

    await dbClient.end()
}

runDatabase()

