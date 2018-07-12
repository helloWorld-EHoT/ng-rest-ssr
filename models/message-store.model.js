const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const MessageStoreSchema = new Schema({

    // _id: autoincrement

    messages: {     // Messages
        type: [String],
        required: false
    }

});

mongoose.model('messageStore', MessageStoreSchema);
