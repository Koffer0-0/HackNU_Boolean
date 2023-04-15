import {Schema, model} from 'mongoose'

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: { type: String, default: 'specialist', readOnly: true },
})

export const Specialist = model('Specialist', schema)