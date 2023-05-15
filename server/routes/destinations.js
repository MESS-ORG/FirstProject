const express = require('express')
const router = express.Router()
const auth = require('./auth')
const Destinations = require('../models/Destinations')

router.get('/', auth, async (req, res) => {
  console.log("GET request to /destinations received")
  try {const destinations = await Destinations.find()
    res.json(destinations)} catch (err) {
    console.error(err.message)
    res.status(500).json({ message: 'Server error' }) }
})

router.get('/destinations/:id', auth, async (req, res) => {
  try {
    const destination = await Destinations.findById(req.params.id)
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' })
    }
    res.json(destination)
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router


