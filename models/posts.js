const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    itemCategory: {
        type: String,
        required: true,
        enum: ['Fish', 'Vegetables','Spices','Fruits','Rice and Noodles'] // Corrected spelling
    }
});

// Ensure model is correctly exported as 'Posts'
module.exports = mongoose.model('Posts', postSchema);
