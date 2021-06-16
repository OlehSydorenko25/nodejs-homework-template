const User = require('../model/user');

const findeById = async id => {
  return await User.findById(id);
};

const findeByEmail = async email => {
  return await User.findOne({ email });
};

const create = async body => {
  const user = new User(body);
  return await user.save();
};

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};

const updateSubscription = async (id, subscription) => {
  return await User.updateOne({ _id: id }, { subscription });
};

const updateAvatar = async (id, avatar) => {
  return await User.updateOne({ _id: id }, { avatar });
};

module.exports = {
  findeById,
  findeByEmail,
  create,
  updateToken,
  updateSubscription,
  updateAvatar,
};
