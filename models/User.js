var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
  workerTypeIsStringer: Boolean,
  racquets: [{ type: Schema.Types.ObjectId, ref: "Racquet"}],
  workdays: [{ type: Schema.Types.ObjectId, ref: "Weekday"}]
});

UserSchema.plugin(passportLocalMongoose);

var User = mongoose.model("User", UserSchema);
module.exports = User;
