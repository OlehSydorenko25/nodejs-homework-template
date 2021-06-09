const Contact = require('../model/contact')


const getListContacts = async (userId, query) => {
  // const results = await Contact.find({owner: userId}).populate({
    // path: 'owner',
    // select: 'email subscription'
  // })
  const {sortBy, sortByDesc, filter, limit = 5, offset = 0} = query
  const optionsSearch = {owner: userId}
  const results = await Contact.paginate(optionsSearch, {
    limit,
    offset,
    sort: {...(sortBy ? {[`${sortBy}`] : 1} : {}),
    ...(sortByDesc ? {[`${sortByDesc}`] : -1} : {})},
    select: filter ? filter.split('|').join(' ') : ' ',
    populate: {path: 'owner', select: 'email subscription'}
  })
  return results
}

const getContactById = async (userId, contactId) => {
  const result = await Contact.findOne({_id: contactId, owner: userId}).populate({
    path: 'owner',
    select: 'email subscription'
  })
  return result
}

const removeContact = async (userId, contactId) => {
  const result = await Contact.findOneAndRemove({_id: contactId, owner: userId})
  return result
}

const addContact = async (userId, body) => {
  const result = await Contact.create({owner: userId, ...body})
  return result
}

const updateContact = async (userId, contactId, body) => {
  const result = await Contact.findOneAndUpdate(
    {_id: contactId, owner: userId},
    {... body},
    {new: true}
  )
  return result
}

const updateStatusContact = async (userId, contactId, body) => {
  const result = await Contact.findOneAndUpdate(
    {_id: contactId, owner: userId},
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
