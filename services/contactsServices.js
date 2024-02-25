import Contact from "../models/Contact.js";

function listContacts() {
  return Contact.find();
}

function getContactsByFilter(filter, query = {}) {
  return Contact.find(filter, "-createdAt -updatedAt", query);
}

function getContactsCountByFilter(filter) {
  return Contact.countDocuments(filter);
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
  getContactsByFilter,
  getContactsCountByFilter,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
