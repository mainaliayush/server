import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    fname: { type: String },
    lname: { type: String },
    phone: { type: String },
    email: { type: String },
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String },
    country: { type: String },
    cByPhone: { type: Boolean },
    cByEmail: { type: Boolean },
    cByMail: { type: Boolean },
    id: { type: String},
});


const Contact = mongoose.model('contact', contactSchema);
export default Contact;