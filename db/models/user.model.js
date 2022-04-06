const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
   name: String,
   last: String,
   meta: {
      votes: Number,
      favs: Number
   }
});

const User = mongoose.model('User', userSchema);

module.exports = {
   User: User
}
