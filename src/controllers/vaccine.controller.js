const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { vaccineService } = require('../services');

const list = catchAsync(async (req, res) => {
  const data = await vaccineService.findAll();

  res.status(httpStatus.OK).send(data);
});

const get = catchAsync(async (req, res) => {
  const { city } = req.params;
  const data = await vaccineService.findByCity(city);

  if (data) {
    res.status(httpStatus.OK).send(data);
  } else {
    res.status(httpStatus.NOT_FOUND).send({
      error: 'City name is not valid',
    });
  }
});

module.exports = {
  list,
  get,
};
