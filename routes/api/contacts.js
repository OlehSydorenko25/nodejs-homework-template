const express = require('express')
const router = express.Router()
const ctrl = require('../../controllers/contacts')
const {validationCreateContact, validationUpdateContact, validationUpdateContactFavorite, validateMongoId} =  require('./validation')

router.get('/', ctrl.getListContacts)

router.get('/:contactId', validateMongoId, ctrl.getContactById)

router.post('/', validationCreateContact, ctrl.addContact)

router.delete('/:contactId', validateMongoId, ctrl.removeContact)

router.patch('/:contactId', validateMongoId, validationUpdateContact, ctrl.updateContact)

router.patch('/:contactId/favorite', validateMongoId, validationUpdateContactFavorite, ctrl.updateStatusContact)

module.exports = router
