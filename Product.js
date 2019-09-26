const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Product = new Schema ({
    name: {type: String},
    type: {type: String},
    measure: {type: String},
},{
    collection: 'product'
})
