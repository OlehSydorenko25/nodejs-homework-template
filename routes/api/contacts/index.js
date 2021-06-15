const express = require('express');
const router = express.Router();
const ctrl = require('../../../controllers/contacts');
const guard = require('../../../helpers/guard');
const {
  validationCreateContact,
  validationUpdateContact,
  validationUpdateContactFavorite,
  validateMongoId,
} = require('./validation');

router.get('/', guard, ctrl.getListContacts);

router.get('/:contactId', guard, validateMongoId, ctrl.getContactById);

router.post('/', guard, validationCreateContact, ctrl.addContact);

router.delete('/:contactId', guard, validateMongoId, ctrl.removeContact);

router.patch(
  '/:contactId',
  guard,
  validateMongoId,
  validationUpdateContact,
  ctrl.updateContact,
);

router.patch(
  '/:contactId/favorite',
  guard,
  validateMongoId,
  validationUpdateContactFavorite,
  ctrl.updateStatusContact,
);

module.exports = router;
