const mongoose = require('mongoose');


const locationSchema = new mongoose.Schema(
{
latitude: {
type: Number,
required: true
},
longitude: {
type: Number,
required: true
},
note: {
type: String,
default: ''
}
},
{ timestamps: true }
);


module.exports = mongoose.model('Location', locationSchema);
