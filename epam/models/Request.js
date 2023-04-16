import {model, Schema, Types} from 'mongoose'

const schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    client: { type: Types.ObjectId, ref: 'Client' },
    group: { type: Types.ObjectId, ref: 'SpecialistGroup' },
    operator: { type: Types.ObjectId, ref: 'Operator' },
    status: { type: String, default: 'Waiting'},
    clientCompleted: { type: Boolean, default: false },
    groupCompleted: { type: Boolean, default: false }
});

export const Request = model('Request', schema);