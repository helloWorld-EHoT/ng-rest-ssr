const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const UserSchema = new Schema({

    // _id: autoincrement

    name: {             // visible name
        type: String,
        required: true
    },
    email: {            // MD5
        type: String,
        required: true,
        unique: true
    },
    password: {         // MD5
        type: String,
        required: true
    },
    assign_chats: {     // Chats ids
        type: [String],
        required: false
    },
    role: {
        type: String,
        required: true,
        default: 'user'
    }

});

mongoose.model('user', UserSchema);
