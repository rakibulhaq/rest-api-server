let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

const UserPermissionSchema = new Schema({
    user: {type: ObjectId, ref : 'User'},
    permissions : [{type: ObjectId, ref: 'Permission'}]
});

UserPermissionSchema.methods.toJSON = function(){
    let object = this.toObject();
    delete object.__v;
    return object;
}

module.exports.UserPermissionModel = mongoose.model('UserPermission', UserPermissionSchema);