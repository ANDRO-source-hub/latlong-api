const Location = require('../models/Location');


// CREATE
exports.createLocation = async (req, res) => {
try {
const { latitude, longitude, note } = req.body;


const location = await Location.create({
latitude,
longitude,
note
});
res.status(201).json({ success: true, data: location });
} catch (error) {
res.status(400).json({ success: false, message: error.message });
}
};
exports.getLocations = async (req, res) => {
try {
const locations = await Location.find().sort({ createdAt: -1 });
res.json({ success: true, data: locations });
} catch (error) {
res.status(500).json({ success: false, message: error.message });
}
};


// READ BY ID
exports.getLocationById = async (req, res) => {
try {
const location = await Location.findById(req.params.id);
if (!location) {
return res.status(404).json({ success: false, message: 'Data not found' });
}
res.json({ success: true, data: location });
} catch (error) {
res.status(400).json({ success: false, message: error.message });
}
};
// UPDATE
exports.updateLocation = async (req, res) => {
try {
const location = await Location.findByIdAndUpdate(
req.params.id,
req.body,
{ new: true, runValidators: true }
);


if (!location) {
return res.status(404).json({ success: false, message: 'Data not found' });
}


res.json({ success: true, data: location });
} catch (error) {
res.status(400).json({ success: false, message: error.message });
}
};
// DELETE
exports.deleteLocation = async (req, res) => {
try {
const location = await Location.findByIdAndDelete(req.params.id);


if (!location) {
return res.status(404).json({ success: false, message: 'Data not found' });
}


res.json({ success: true, message: 'Data deleted' });
} catch (error) {
res.status(400).json({ success: false, message: error.message });
}
};
