const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const MessageSchema = new Schema({

    // _id: autoincrement

    content: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: true
    },
    sender_id: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    chat_id: {
        type: String,
        required: true
    },
    read: {
        type: Boolean,
        required: true
    }

});

mongoose.model('message', MessageSchema);
