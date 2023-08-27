const account = require('./records/account.js')
const cv = require('./records/cv.js')
const personaldata = require('./records/personaldata.js')
const knowledge = require('./records/knowledge.js')
const job = require('./records/job.js')
const hobby = require('./records/hobby.js')
const skill = require('./records/skill.js')
const link = require('./records/link.js')

module.exports = {
    account: account,
    cv: cv,
    personaldata: personaldata,
    knowledge: knowledge,
    job: job,
    hobby: hobby,
    skill: skill,
    link: link
}