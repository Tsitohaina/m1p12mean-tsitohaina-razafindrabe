const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  user: {
    type: User,
    required: true,
  },
  vehicle: {
    type: String, 
    required: true,
  },
  appointmentDateTime: {
    type: Date,
    required: true,
  },
  serviceType: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Scheduled', 'In Progress', 'Completed', 'Cancelled'], 
    default: 'Scheduled',
  }
}, {
  timestamps: true, 
});

module.exports = mongoose.model('Appointment', appointmentSchema);
