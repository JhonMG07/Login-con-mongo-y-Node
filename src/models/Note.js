//esquema de las notas
const {Schema,model} = require('mongoose');

const noteSchema = new Schema({
    titulo:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    }
    
},{
    timestamps: true //añade la fecha de creacion
});

module.exports= model('Note',noteSchema);