const Joi = require('joi');
const mongoose = require('mongoose');

const schemaCreateContact = Joi.object({
  name: Joi.string().min(3).max(30).required(),

  phone: Joi.string().min(3).max(30).required(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  favorite: Joi.bool(),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).optional(),

  phone: Joi.number().integer().optional(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .optional(),
  favorite: Joi.bool(),
}).or('name', 'phone', 'email');

const schemaUpdateContactFavorete = Joi.object({
  favorite: Joi.bool().required(),
});

const validate = async (schema, obj, next) => {
  try {
    await schema.validateAsync(obj);
    next();
  } catch (err) {
    next({
      status: 400,
      message: err.message.replace(/"/g, ''),
    });
  }
};

module.exports = {
  validationCreateContact: (req, res, next) => {
    return validate(schemaCreateContact, req.body, next);
  },

  validationUpdateContact: (req, res, next) => {
    return validate(schemaUpdateContact, req.body, next);
  },

  validationUpdateContactFavorite: (req, res, next) => {
    return validate(schemaUpdateContactFavorete, req.body, next);
  },

  validateMongoId: (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.contactId)) {
      return next({
        status: 400,
        message: 'invalid ObjectId',
      });
    }
    next();
  },
};
