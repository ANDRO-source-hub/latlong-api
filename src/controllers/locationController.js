const Location = require('../models/Location')

// CREATE
exports.createLocation = async (req, res) => {
  try {
    console.log('REQ BODY:', req.body)

    const { latitude, longitude, note } = req.body

    // Validasi manual (penting untuk debug)
    if (latitude === undefined || longitude === undefined) {
      return res.status(400).json({
        success: false,
        message: 'latitude and longitude are required'
      })
    }

    const location = await Location.create({
      latitude,
      longitude,
      note
    })

    return res.status(201).json({
      success: true,
      data: location
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

// READ ALL
exports.getLocations = async (req, res) => {
  try {
    const locations = await Location.find().sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: locations.length,
      data: locations
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

// READ BY ID
exports.getLocationById = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id)

    if (!location) {
      return res.status(404).json({
        success: false,
        message: 'Data not found'
      })
    }

    res.status(200).json({
      success: true,
      data: location
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'Invalid ID'
    })
  }
}

// UPDATE
exports.updateLocation = async (req, res) => {
  try {
    const location = await Location.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )

    if (!location) {
      return res.status(404).json({
        success: false,
        message: 'Data not found'
      })
    }

    res.status(200).json({
      success: true,
      data: location
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    })
  }
}

// DELETE
exports.deleteLocation = async (req, res) => {
  try {
    const location = await Location.findByIdAndDelete(req.params.id)

    if (!location) {
      return res.status(404).json({
        success: false,
        message: 'Data not found'
      })
    }

    res.status(200).json({
      success: true,
      message: 'Data deleted successfully'
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'Invalid ID'
    })
  }
}
