const moogoose = require('mongoose');

const userSchema = new moogoose.Schema({
  email: {
    type: String,
    required: true, 
  },
  name:{
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  photoUrl: {
    type: String,
  },
} ,{timestamps: true});


const UserModel = moogoose.model("User", userSchema);
module.exports = UserModel;


