import contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

const getAllContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const result = await contactsService.getContactsByFilter(
    { owner },
    { skip, limit }
  );
  const total = await contactsService.getContactsCountByFilter({ owner });
  res.status(200).json({ total, result });
};

const getOneContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await contactsService.getContactById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(result);
};

const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await contactsService.removeContact(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

const createContact = async (req, res, next) => {
  const { _id: owner } = req.user;
  const result = await contactsService.addContact({ ...req.body, owner });

  res.status(201).json(result);
};

const updateContact = async (req, res, next) => {
  const { id } = req.params;

  const result = await contactsService.updateContact(id, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(result);
};

const updateStatusContact = async (req, res, next) => {
  const { id } = req.params;
  const updatedData = req.body;

  const result = await contactsService.updateStatusContact(id, updatedData);
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(result);
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
