const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const ChatSchema = new Schema({

    // _id: autoincrement

    chat_name: {             // visible name
        type: String,
        required: true
    },
    assign_users: {         // Users ids
        type: [String],
        required: true
    },
    message_store_id: {
        type: String,
        required: true
    },
    enable: {
        type: Boolean,
        required: true,
        default: true
    },
    messages: {
        type: [String],
        required: false
    }

});

mongoose.model('chat', ChatSchema);
