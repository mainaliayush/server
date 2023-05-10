import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
});

const User = mongoose.model('user', userSchema);
export default User;
