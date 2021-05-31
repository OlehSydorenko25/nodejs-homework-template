const Contact = require('../model/contact')


const getListContacts = async () => {
  const results = await Contact.find()
  return results
}

const getContactById = async (contactId) => {
  const result = await Contact.findOne({_id: contactId})
  return result
}

const removeContact = async (contactId) => {
  const result = await Contact.findOneAndRemove({_id: contactId})
  return result
}

const addContact = async (body) => {
  const result = await Contact.create(body)
  return result
}

const updateContact = async (contactId, body) => {
  const result = await Contact.findOneAndUpdate(
    {_id: contactId},
    {... body},
    {new: true}
  )
  return result
}

const updateStatusContact = async (contactId, body) => {
  const result = await Contact.findOneAndUpdate(
    {_id: contactId},
    {... body},
    {new: true}
  )
  return result
}

module.exports = {
  getListContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact
}
