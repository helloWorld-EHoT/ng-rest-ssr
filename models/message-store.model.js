const mongoose = require('mongoose');

const Schema = mongoose.Schema;

require('./models/message.model');

const MessageStoreSchema = new Schema({

    // _id: autoincrement

    messages: {     // Messages
        type: [message],
        required: false
    },
    chat_id: {
        type: String,
        required: true
    },
    user_id: {
        type: [String],
        required: false
    }

});

mongoose.model('messageStore', MessageStoreSchema);
