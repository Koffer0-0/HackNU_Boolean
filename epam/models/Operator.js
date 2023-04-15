import {Schema, model} from 'mongoose'

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    first_name: {type: String, required: true},
    second_name: {type: String, required: true},
    password: {type: String, required: true},
    // links: [{type: Types.ObjectId, ref: 'Link'}]
})

export const Operator = model('Operator', scahema)