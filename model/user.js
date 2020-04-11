var mongoose = require('mongoose')
var UserSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: true,
		trim: true
	},
	username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  }
})

UserSchema.set('toJSON', {transform: (document, returnedObject)=>{
	returnedObject.id = returnedObject._id.toString()
	delete returnedObject.password;
	delete returnedObject._id
	delete returnedObject.__v
}})

var User = mongoose.model('User', UserSchema);

module.exports = User;