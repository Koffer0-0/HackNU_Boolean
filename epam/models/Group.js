import {Schema, model, Types} from 'mongoose'

const schema = new Schema({
    name: {type: String, required: true},
    specialists: [{type: Types.ObjectId, ref: 'Specialist'}]
})

export const Group = model('Group', schema)