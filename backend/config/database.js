const mongoose = require('mongoose');
require('dotenv').config();

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));
}
