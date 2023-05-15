const express = require('express')
const router = express.Router()
const auth = require('./auth')
const Reservation = require('../models/Reservation')
const Destinations = require('../models/Destinations')


router.get('/', auth, async (req, res) => {
  try {
    const reservation = await Reservation.find().populate('destination')
    res.json(reservation)
   
    console.log("GET request to /reservation received")
  } catch (err) {
 
    console.error(err.message)
    res.status(500).json({ message: 'Server error' })
  }
})

router.get('/:id', auth, async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id).populate('destination')
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' })
    }
    res.json(reservation)
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ message: 'Server error' })
  }
})

router.post('/', auth, async (req, res) => {
  try {
    const { firstName, lastName, passportNumber, destinationName, airportName, date } = req.body
    const destination = await Destinations.findOne({ destination: destinationName })
    if (!destination) {
      return res.status(400).json({ message: 'Invalid destination name' })}
    const airport = destination.airports.find((a) => a.name === airportName)
    if (!airport) {
      return res.status(400).json({ message: 'Invalid airport name' })}
    const reservation = new Reservation({
      firstName,
      lastName,
      passportNumber,
      destination: destination._id,
      airport: { name: airport.name, code: airport.code },
      date
    })
    await reservation.save()

    res.status(201).json(reservation)
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ message: 'Server error' })
  }
})


router.put('/:id', auth, async (req, res) => {
  try { const { firstName, lastName, passportNumber, destinationName, airportName, date } = req.body
    const reservation = await Reservation.findById(req.params.id)
    const airport = destination.airports.find((a) => a.name === airportName)
    if (!airport) { return res.status(400).json({ message: 'Invalid airport name' }) }
    reservation.firstName = firstName
    reservation.lastName = lastName
    reservation.passportNumber = passportNumber
    reservation.destination = destination
    reservation.airport = airport
    reservation.date = date
    await reservation.save()
    res.json(reservation)} catch (err) {
    console.error(err.message)
    res.status(500).json({ message: 'Server error' })}
})

router.delete('/:id', auth, async (req, res) => {
  try {const reservation = await Reservation.findById(req.params.id)
    if (!reservation) { return res.status(404).json({ message: 'Reservation not found' }) }
    await Reservation.deleteOne({ _id: req.params.id })
    res.json({ message: 'Reservation deleted successfully' })} catch (err) {
    console.error(err.message)
    res.status(500).json({ message: 'Server error' })}
})

module.exports = router
