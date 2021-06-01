
const { Schema, model } = require('mongoose');

const ContactSchema = new Schema( {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  }, 
  {
    versionKey: false,
    timestamps: true,
    toJSON: {virtuals: true, transform: function(doc, ret) {
        delete ret._id
        return ret
    }},
    toObject: {virtuals: true}
    
});

  const Contact = model('contact', ContactSchema)

  module.exports = Contact