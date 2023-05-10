import Contact from "../models/Contact.js"
import NodeGeocoder from 'node-geocoder';
const options = {
  provider: 'openstreetmap'
};

const geocoder = NodeGeocoder(options);
export const newContact = async (req, res) => {
  try {
    console.log("New contact added", req.body);
    let { fname, lname, phone, email, street, city, state, zip, country, cByMail, cByEmail, cByPhone } = req.body;

    const newContact = new Contact({
      id: Math.floor(Math.random() * 100),
      fname: fname,
      lname: lname,
      phone: phone,
      email: email,
      street: street,
      city: city,
      state: state,
      zip: zip,
      country: country,
      cByEmail: cByEmail,
      cByPhone: cByPhone,
      cByMail: cByMail
    });
    await newContact.save();
    res.status(200).json({ message: 'Contact added successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error occurred while adding contact.' });
  }
};

export const editContact = async (req, res) => {
  try {
    console.log("Edit contact", req.body);
    let { fname, lname, phone, email, street, city, state, zip, country, cByMail, cByEmail, cByPhone, id, _id } = req.body;
    const newContact = {
      id: id,
      fname: fname,
      lname: lname,
      phone: phone,
      email: email,
      street: street,
      city: city,
      state: state,
      zip: zip,
      country: country,
      cByEmail: cByEmail,
      cByPhone: cByPhone,
      cByMail: cByMail
    };
    console.log("New Contact")
    const updatedContact = await Contact.findByIdAndUpdate(_id, newContact, { new: true });
    res.status(200).json({ message: 'Contact added successfully.', data: updatedContact});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error occurred while adding contact.' });
  }
};

export const getContact = async (req, res) => {
  try {
    const contacts = await Contact.find({});
    let modifiedContacts = []
    for (let i = 0; i < contacts.length; i++) {
      var tempObj = {}
      tempObj["id"] = contacts[i]["id"]
      tempObj["name"] = contacts[i]["fname"] + " " + contacts[i]["lname"]
      tempObj["phone"] = contacts[i]["phone"]
      tempObj["email"] = contacts[i]["email"]
      tempObj["address"] = contacts[i]["street"] + "," + contacts[i]["city"] + ", " + contacts[i]["state"] + " " + contacts[i]["zip"] + " " + contacts[i]["country"]
      tempObj["cByEmail"] = contacts[i]["cByEmail"]
      tempObj["cByPhone"] = contacts[i]["cByPhone"]
      tempObj["cByMail"] = contacts[i]["cByMail"]
      const res = await geocoder.geocode(tempObj["address"]);
      if (res.length) {
        tempObj["coordinates"] = [res[0].latitude, res[0].longitude]
      }
      modifiedContacts.push(tempObj)
    }
    res.status(200).json({ contacts: modifiedContacts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};



export const singleContact = async (req, res) => {
  const { id } = req.params;
  try {
    const contacts = await Contact.find({ id: id });
    if (contacts.length > 0) {
      const contact = contacts[0];
      const tempObj = {
        id: contact.id,
        _id: contact._id,
        name: `${contact.fname} ${contact.lname}`,
        phone: contact.phone,
        fname: contact.fname,
        lname: contact.lname,
        email: contact.email,
        street: contact.street,
        city: contact.city,
        state: contact.state,
        country: contact.country,
        zip: contact.zip,
        address: `${contact.street || ''} ${contact.city}, ${contact.state} ${contact.zip} ${contact.country}`,
        cByEmail: contact.cByEmail,
        cByPhone: contact.cByPhone,
        cByMail: contact.cByMail
      };
      // res.render('individual', { contacts: tempObj });
      res.status(200).json({ contacts: tempObj });
    } else {
      console.log("No contacts found with the specified id.");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
}

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const tempContact = await Contact.find({ id: id });
  console.log(tempContact)
  if (tempContact.length == 0) {
    return res.status(404).json({message: "User not Found"});
  }
  try {
    const complete = await Contact.findByIdAndDelete(tempContact[0]._id);
    if(!complete){
      return res.status(404).json({message: "User not Found"});
    }
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to delete contact' });
  }
}