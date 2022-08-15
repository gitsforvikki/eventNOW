const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {type: String,require:true  },
    email: {type: String,require:true , unique : true},
    password: {type: String,require:true  },
    isAdmin: {type: Boolean,require:true  },
    avatar: {type: String,require:true  },
    created: {type: Date,default:Date.now}    
});

const User =  mongoose.model('user',UserSchema);

module.exports = User;