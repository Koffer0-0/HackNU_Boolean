import {model, Schema, Types} from 'mongoose'

const schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    client: { type: Types.ObjectId, ref: 'Client' },
    group: { type: Types.ObjectId, ref: 'Specialist' },
    status: { type: String, required: true },
    operator: { type: Types.ObjectId, ref: 'Operator' },
});

export const Request = model('Request', schema)