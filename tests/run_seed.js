const { use } = require("passport");
const seeds = require("../seeds")
const api = require('./api/run_seed_methods.js')

// IMPORTANT
// RUN "../database/db/drop_db.sql" 
// AND "../database/db/create_db.sql" 
// AND "../database/db/pre_insert.sql" 
// AND "../database/db/trigger.sql" 
// BEFORE RUNNING THIS FILE 
// THEN 
// RUN node tests/run_seed.js

// OR JUST
// RUN node tests/run_database.js
// THEN 
// RUN node tests/run_seed.js


const seedMyDB = async ()=>{
    try{
        const allCvRecords = seeds.cv;
        const allAccountRecords = seeds.account;
        const allPersonaldataRecords = seeds.personaldata;
        const allKnowledgeRecords = seeds.knowledge;
        const allJobRecords = seeds.job;
        const allHobbyRecords = seeds.hobby;
        const allSkillRecords = seeds.skill;
        const allLinkRecords = seeds.link;

        // Here you can config if you want to copy images 
        const copyImages = true;

        if(copyImages){
            api.copyImages(20);
        }

        const dataList = [allCvRecords, allAccountRecords, allPersonaldataRecords, allKnowledgeRecords, allJobRecords, allHobbyRecords, allSkillRecords, allLinkRecords]
        for(let i = 0; i < dataList.length; i++ ){
            console.log(`DATALIST - ${i} INSERTING...`);
            for(record of dataList[i]){
                switch (i) {
                    case 0: // allCvRecords
                        await api.addCv(...Object.values(record));
                        break;
                    case 1: // allAccountRecords
                        await api.register(...Object.values(record));
                        break;
                    case 2: // allPersonaldataRecords
                        await api.addPersonalData(...Object.values(record));
                        break;
                    case 3: // allKnowledgeRecords
                        await api.addKnowledge(...Object.values(record));
                        break;
                    case 4: // allJobRecords
                        await api.addExperience(...Object.values(record));
                        break;
                    case 5: // allHobbyRecords
                        await api.addHobby(...Object.values(record));
                        break;
                    case 6: // allSkillRecords
                        await api.addSkill(...Object.values(record));
                        break;
                    case 7: // allLinkRecords
                        await api.addLink(...Object.values(record));
                        break;
                    }
                }
            }

        console.log('--------ALL DATA INSERTED!!!---------');
        process.exit(1);
        }catch (e){   
        console.log(e);
    }
}

seedMyDB();
