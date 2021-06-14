const Users = require('../repositories/users');
const { HttpCode } = require('../helpers/constants');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;

const register = async (req, res, next) => {
  try {
    const user = await Users.findeByEmail(req.body.email);

    if (user) {
      return res
        .status(HttpCode.CONFLICT)
        .json({
          status: 'error',
          code: HttpCode.CONFLICT,
          message: 'Email is used',
        });
    }

    const { id, name, email, subscription } = await Users.create(req.body);

    res
      .status(HttpCode.CREATED)
      .json({
        status: 'success',
        code: HttpCode.CREATED,
        data: { id, name, email, subscription },
      });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await Users.findeByEmail(req.body.email);
    const IsVallidPassport = user?.isValidPassword(req.body.password);

    if (!user || !IsVallidPassport) {
      return res
        .status(HttpCode.UNAUTORIZED)
        .json({
          status: 'error',
          code: HttpCode.UNAUTORIZED,
          message: 'Invalid credentials',
        });
    }

    const id = user.id;
    const payload = { id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1d' });
    await Users.updateToken(id, token);

    res
      .status(HttpCode.CREATED)
      .json({ status: 'success', code: HttpCode.CREATED, data: { token } });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  const id = req.user.id;
  try {
    await Users.updateToken(id, null);
    res.status(HttpCode.NO_CONTENT).json({});
  } catch (error) {
    next(error);
  }
};

const userUpdate = async (req, res, next) => {
  const id = req.user.id;
  try {
    const contact = await Users.updateSubscription(id, req.body);
    if (contact) {
      return res.json({ status: 'success', code: 200, data: { contact } });
    }
    return res.json({ status: 'error', code: 404, message: 'Not found' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  logout,
  userUpdate,
};
