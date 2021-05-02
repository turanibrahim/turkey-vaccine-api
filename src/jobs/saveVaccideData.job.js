const schedule = require('node-schedule');
const { vaccineService } = require('../services');

const saveVaccineDataJob = schedule.scheduleJob({ hour: 23, minute: 23 }, async function () {
  await vaccineService.saveVaccineData();
});

module.exports = saveVaccineDataJob;
