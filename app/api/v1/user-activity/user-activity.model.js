let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;
const UserActivitySchema = new Schema({
user: {type: ObjectId, ref: 'user'},
activity : {type: ObjectId, ref: 'activity'},
activityTimeStart: Date,
activityTimeEnd: Date,
activityDescription: String,
pointsAwarded: Number
});

UserActivitySchema.methods.toJSON = function(){
    let object = this.toObject();
    delete object.__v;
    return object;
}
module.exports.UserActivityModel = mongoose.model('UserActivity', UserActivitySchema);