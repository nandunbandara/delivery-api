const mongoose = require('mongoose');
const {USER_TYPES} = require('./user-types');

const UserSchema = new mongoose.Schema({
    uid: { type: String, unique: true, required: true },
    userType: { type: Number, enum: [...Object.values(USER_TYPES)], default: USER_TYPES.COMPANY },
});

module.exports = mongoose.model('user', UserSchema);