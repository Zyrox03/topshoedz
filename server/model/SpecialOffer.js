const mongoose = require('mongoose');
const { Schema } = mongoose;

const specialOfferSchema = new Schema({
  name: {
    type: String,
  },
  slug: {
    type: String,
  },
  specialDescription: {
    type: String,
  },
  deadline: {
    type: Date,
  },
});

const SpecialOffer = mongoose.model('SpecialOffer', specialOfferSchema);

module.exports = SpecialOffer;
