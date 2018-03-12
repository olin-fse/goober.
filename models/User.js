const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fb: {
		id: String,
		access_token: String,
		firstName: String,
        lastName: String,
		email: String
	},
});

const User = mongoose.model('User', userSchema);
module.exports = User;
