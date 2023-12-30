const insertTeams = require('./public/js/seedingTeams')
const algorithm = require('./public/js/algorithm');
const sortTeams = require('./public/js/sorter');
const insertEvents = require('./public/js/seedingEvents');
const cron = require('node-cron')

async function cron1() {
    await insertTeams()
    await algorithm()
    await sortTeams()
    await new Promise(r => setTimeout(r, 60000));
    await insertEvents()
}

let running = false;
cron.schedule('0 16 30,8,16,23 * *', async () => {
    if (running === false) {
        running = true;
        console.log('scheduled')
        await cron1()
        running = false;
    }
}
)
