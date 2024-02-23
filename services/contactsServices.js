import Contact from "../models/Contact.js";

function listContacts() {
  return Contact.find();
}

function getContactById(contactId) {
  return Contact.findById(contactId);
}

function removeContact(contactId) {
  return Contact.findByIdAndDelete(contactId);
}

function addContact(contact) {
  return Contact.create(contact);
}

function updateContact(contactId, data) {
  return Contact.findByIdAndUpdate(contactId, data);
}

function updateStatusContact(contactId, updatedData) {
  return Contact.findByIdAndUpdate(contactId, updatedData);
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
