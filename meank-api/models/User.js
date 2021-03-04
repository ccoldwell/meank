const bcrypt = require('bcrypt');
const crypto = require('crypto');
const mongoose = require('mongoose');

// -------------------------------------------------------------------------
//
// User Schema
//
// -------------------------------------------------------------------------
const userSchema = new mongoose.Schema ({
	email                  : { type: String, unique: true },
	password               : String,
	passwordResetToken     : String,
	passwordResetExpires   : Date,
	emailVerificationToken : String,
	emailVerified          : Boolean,

	snapchat   : String,
	facebook   : String,
	twitter    : String,
	google     : String,
	github     : String,
	instagram  : String,
	linkedin   : String,
	steam      : String,
	twitch     : String,
	quickbooks : String,
	tokens     : Array,

	profile    : {
		name     : String,
		gender   : String,
		location : String,
		website  : String,
		picture  : String
	}
},{
	timestamps:true
});

// -------------------------------------------------------------------------
//
// hash a password pre save
//
// -------------------------------------------------------------------------
userSchema.pre ('save', function save (next) {
	const user = this;
	if (!user.isModified ('password')) return next ();
	bcrypt.genSalt (10, (err, salt) => {
		if (err) return next (err);
		bcrypt.hash (user.password, salt, (err, hash) => {
			if (err) return next (err);
			user.password = hash;
			next ();
		});
	});
});

// -------------------------------------------------------------------------
//
// compare passwords
//
// -------------------------------------------------------------------------
userSchema.methods.comparePassword = function comparePassword (candidate, cb) {
	bcrypt.compare (candidate, this.password, (err, isMatch) => {
		cb (err, isMatch);
	});
};

// -------------------------------------------------------------------------
//
// gravatar
//
// -------------------------------------------------------------------------
userSchema.methods.gravatar = function gravatar (size) {
	if (!size) size = 200;
	if (!this.email) return `https://gravatar.com/avatar/?s=${size}&d=retro`;
	const md5 = crypto.createHash('md5').update(this.email).digest('hex');
	return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

const User = mongoose.model ('User', userSchema);

module.exports = User;
