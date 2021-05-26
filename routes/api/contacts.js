const express = require('express')
const router = express.Router()
const Contacts = require('../../model')
const {validationCreateContact, validationUpdateContact} =  require('./validation')

router.get('/', async (req, res, next) => {
  try {
    const contacts = await Contacts.getListContacts()
    res.json({ status: 'success', code: 200, data: {contacts}})
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.contactId)
    if (contact) {
      return res.json({ status: 'success', code: 201, data: {contact}})
    }
    return res.json({ status: 'error', code: 404, message: 'Not found'})
  } catch (error) {
    next(error)
  }
})

router.post('/', validationCreateContact, async (req, res, next) => {
  try {
    const contact = await Contacts.addContact(req.body)
    if (contact) {
      return res.json({ status: 'success', code: 201, data: {contact}})
    }
    return res.json({ status: 'success', code: 400, "message": "missing required name field"})
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const contact = await Contacts.removeContact(req.params.contactId)
    if (contact) {
      return res.json({ status: 'success', code: 200, data: {contact}})
    }
    return res.json({ status: 'error', code: 404, message: 'Not found'})
  } catch (error) {
    next(error)
  }
})

router.patch('/:contactId', validationUpdateContact, async (req, res, next) => {
  try {
    const contact = await Contacts.updateContact(req.params.contactId, req.body)
    if (contact) {
      return res.json({ status: 'success', code: 201, data: {contact}})
    }
    return res.json({ status: 'error', code: 404, message: 'Not found'})
  } catch (error) {
    next(error)
  }

})

module.exports = router
