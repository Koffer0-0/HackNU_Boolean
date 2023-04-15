import {Schema, model} from 'mongoose'

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    company_name: {type: String, required: true},
    company_address: {type: String, required: true},
    phone_number: {type: String, required: true},
    // links: [{type: Types.ObjectId, ref: 'Link'}]
    role: { type: String, default: 'client', required: true },
})

export const Client = model('Client', schema)