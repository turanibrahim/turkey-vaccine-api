const axios = require('axios');
const jsdom = require('jsdom');
const { Vaccine } = require('../models');
const logger = require('../config/logger');

const { JSDOM } = jsdom;

const fetchVaccineData = async () => {
  let htmlResponse;

  await axios.get('https://covid19asi.saglik.gov.tr/').then((response) => {
    htmlResponse = response.data;
  });

  const { document } = new JSDOM(htmlResponse).window;

  return [...document.getElementsByTagName('g')]
    .filter((item) => item.id !== 'turkiye')
    .map((item) =>
      [...item.attributes].reduce(
        (acc, i) => Object.assign(acc, { [i.name.replace(/-./g, (match) => match[1].toUpperCase())]: i.value }),
        {}
      )
    )
    .map((item) => ({
      city: item.dataAdi,
      total: item.dataToplam,
      firstDose: item.dataBirinciDoz,
      secondDose: item.dataIkinciDoz,
    }));
};

const saveVaccineData = async () => {
  const vaccineData = await fetchVaccineData();

  await Vaccine.create(
    {
      data: vaccineData,
    },
    function (err) {
      if (err) logger.warn(err);
    }
  );
};

const findAll = async () => {
  const [vaccineData] = await Vaccine.find().limit(1).sort({ $natural: -1 });

  return vaccineData;
};

const findByCity = async (city) => {
  const [vaccineData] = await Vaccine.find().limit(1).sort({ $natural: -1 });

  return vaccineData.data.find((data) => data.city.toLowerCase() === city.toLowerCase());
};

module.exports = {
  saveVaccineData,
  findAll,
  findByCity,
};
