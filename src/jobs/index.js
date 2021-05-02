const saveVaccineDataJob = require('./saveVaccideData.job');

const jobs = [saveVaccineDataJob];

const executeJobs = () => {
  jobs.forEach((job) => {
    job.job();
  });
};

module.exports = executeJobs;
