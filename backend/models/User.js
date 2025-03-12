const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
        name: { type: String, required: true },
        mail: { type: String, required: true, unique: true },
        mobil: { type: String, required: true },
        password: { type: String, required: true },
        role: {
                type: String,
                enum: ['client', 'mécanicien', 'manager'],
                required: true,
        },
        appointmentHistory: [
                {
                        date: { type: Date, required: true },
                        serviceDetails: { type: String },
                        cost: { type: Number },
                }
        ],
        assignedRepairs: [
                {
                        repairId: { type: mongoose.Schema.Types.ObjectId, ref: 'Repair' },
                        status: { type: String, enum: ['en attente', 'en cours', 'terminé'], default: 'en attente' },
                }
        ],
        managedMechanics: [
                {
                        mechanicId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
                        permissions: [String],
                }
        ],
}, { timestamps: true });

UserSchema.pre('save', async function (next) {
        if (this.isModified('password')) {
                this.password = await bcrypt.hash(this.password, 10);
        }
        next();
});

module.exports = mongoose.model('User', UserSchema); 