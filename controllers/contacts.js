const Contacts = require('../repositories/contacts')


const getListContacts = async (req, res, next) => {
    try {
      const contacts = await Contacts.getListContacts()
      res.json({ status: 'success', code: 200, data: {contacts}})
    } catch (error) {
      next(error)
    }
}
  
  const getContactById = async (req, res, next) => {
    try {
      const contact = await Contacts.getContactById(req.params.contactId)
      if (contact) {
        return res.json({ status: 'success', code: 201, data: {contact}})
      }
      return res.json({ status: 'error', code: 404, message: 'Not found'})
    } catch (error) {
      next(error)
    }
}
  
  const addContact = async (req, res, next) => {
    try {
      const contact = await Contacts.addContact(req.body)
      if (contact) {
        return res.json({ status: 'success', code: 201, data: {contact}})
      }
      return res.json({ status: 'success', code: 400, "message": "missing required name field"})
    } catch (error) {
      next(error)
    }
  }
  
  const removeContact = async (req, res, next) => {
    try {
      const contact = await Contacts.removeContact(req.params.contactId)
      if (contact) {
        return res.json({ status: 'success', code: 200, data: {contact}})
      }
      return res.json({ status: 'error', code: 404, message: 'Not found'})
    } catch (error) {
      next(error)
    }
  }
  
  const updateContact = async (req, res, next) => {
    try {
      const contact = await Contacts.updateContact(req.params.contactId, req.body)
      if (contact) {
        return res.json({ status: 'success', code: 201, data: {contact}})
      }
      return res.json({ status: 'error', code: 404, message: 'Not found'})
    } catch (error) {
      next(error)
    }
  
  }
  
 const updateStatusContact = async (req, res, next) => {
    try {
      const contact = await Contacts.updateStatusContact(req.params.contactId, req.body)
      if (contact) {
        return res.json({ status: 'success', code: 200, data: {contact}})
      }
      return res.json({ status: 'error', code: 404, message: 'Not found'})
    } catch (error) {
      next(error)
    }
  }

  module.exports = {
    getListContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact,
    updateStatusContact
  }