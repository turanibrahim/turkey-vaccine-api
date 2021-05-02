const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const vaccineSchema = mongoose.Schema(
  {
    data: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

vaccineSchema.plugin(toJSON);

const Vaccine = mongoose.model('vaccine', vaccineSchema);

module.exports = Vaccine;
