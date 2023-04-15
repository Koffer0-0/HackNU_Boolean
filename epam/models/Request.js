import {Schema, model, Types} from 'mongoose'

const schema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    client: [{type: Types.ObjectId, ref: 'Client'}],
    group: [{type: Types.ObjectId, ref: 'SpecialistGroup'}],
})

export const Request = model('Request', schema)