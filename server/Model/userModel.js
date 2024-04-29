import mongoose from "mongoose";

const UserSchema =new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    firstname: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require: true
    },
    isAdmin: {
        type: Boolean,
        dafault: false
    },
    profilePicture: {
        type: String,

    },

},
    { timestamps: true }
)

const UserModel = mongoose.model('user',UserSchema);

export default UserModel