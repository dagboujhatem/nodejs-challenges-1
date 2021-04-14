const cron = require('node-cron');

const task = cron.schedule('0 */2 * * * *', () => {
  console.log('running a task every two minute.');
  //  Busness Logic ....

});

task.stop();