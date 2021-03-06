let mongoose = require('mongoose');
let ObjectId = mongoose.Schema.Types.ObjectId;
let bcrypt = require('bcrypt');
let schema = mongoose.Schema;
let emailValidator = require('validator').isEmail;

const UserSchema = new schema({
    userName: {type: String, required: true},
    name: { type: String, minlength: 2, maxlength: 35, trim: true },
    email: { type: String, default: "" },
    phone: { type: String, default: ""},
    imageUrl: {type: String, default: ""},
    hashedPassword: { type: String, required: true},
    createdTime: Date,
    updatedTime: { type: Date, default: Date.Now },
    status: { type: String, lowercase: true, default: "active" }
});

UserSchema.methods.toJSON = function () {
    let object = this.toObject();
    delete object.hashedPassword;
    delete object.__v;
    return object;
};

UserSchema.virtual('id')
    .get(function () {
        return this._id;
    });
//password getter and setter
UserSchema.virtual('password')
    .set(function (password) {
        this.hashedPassword = this.encryptPassword(password, 10);
    })
    .get(function () {
        return this.hashedPassword;
    });
//methods to ecrypt password
UserSchema.methods.encryptPassword = function(password , saltRound){
     return bcrypt.hashSync(password, saltRound);
};
UserSchema.methods.comparePassword = function(password){
   return bcrypt.compareSync(password, this.hashedPassword);
};

module.exports.User = mongoose.model('User', UserSchema);