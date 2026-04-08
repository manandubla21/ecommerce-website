import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: [true, "Email id must be unique"]
    },

    password: {
        type: String,
        required: true,
    },

    cartData: {
        type: Object,
        default: {}
    }
},{minimize:false})

export const user = mongoose.model('User', userSchema)