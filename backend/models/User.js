const mongoose = require('mongoose'); 

const UserSchema = new mongoose.Schema({ 
        name: { type: String, required: true }, 
        mail: { type: String, required: true, unique: true  },
        mobil: { type: String, required: true},
        password: { type: String, required: true },
}, { timestamps: true }); 

UserSchema.pre('save', async function(next) {
        if (this.isModified('password')) {
          this.password = await bcrypt.hash(this.password, 10);
        }
        next();
});

module.exports = mongoose.model('User', UserSchema); 