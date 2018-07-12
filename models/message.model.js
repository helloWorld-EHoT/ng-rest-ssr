const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const MessageSchema = new Schema({

    // _id: autoincrement

    content: {             // visible name
        type: String,
        required: true
    },
    sender: {            // MD5
        type: String,
        required: true
    },
    date: {         // MD5
        type: String,
        required: true
    },
    chat_id: {
        type: String,
        required: true
    }

});

mongoose.model('message', MessageSchema);
