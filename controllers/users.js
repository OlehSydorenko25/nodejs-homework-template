const jwt = require('jsonwebtoken');
const UploadAvatarService = require('../services/local-upload');
const Users = require('../repositories/users');
const { HttpCode } = require('../helpers/constants');
const EmailService = require('../services/email');
const { CreateSenderNodemailer } = require('../services/email-sender');
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;

const register = async (req, res, next) => {
  try {
    const user = await Users.findeByEmail(req.body.email);

    if (user) {
      return res.status(HttpCode.CONFLICT).json({
        status: 'error',
        code: HttpCode.CONFLICT,
        message: 'Email is used',
      });
    }

    const { id, email, subscription, avatarURL, verifyToken } =
      await Users.create(req.body);

    try {
      const emailService = new EmailService(
        process.env.NODE_ENV,
        new CreateSenderNodemailer(),
      );
      await emailService.sendVerifyEmail(verifyToken, email);
    } catch (error) {
      console.log(error.message);
    }

    res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: { id, email, subscription, avatarURL },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await Users.findeByEmail(req.body.email);
    const IsVallidPassport = user?.isValidPassword(req.body.password);

    if (!user || !IsVallidPassport || !user.verify) {
      return res.status(HttpCode.UNAUTORIZED).json({
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
  try {
    const id = req.user.id;
    await Users.updateToken(id, null);
    res.status(HttpCode.NO_CONTENT).json({});
  } catch (error) {
    next(error);
  }
};

const userUpdate = async (req, res, next) => {
  try {
    const id = req.user.id;
    const contact = await Users.updateSubscription(id, req.body);
    if (contact) {
      return res.json({ status: 'success', code: 200, data: { contact } });
    }
    return res.json({ status: 'error', code: 404, message: 'Not found' });
  } catch (error) {
    next(error);
  }
};

const avatars = async (req, res, next) => {
  try {
    const id = req.user.id;
    const uploads = new UploadAvatarService(process.env.AVATAR_OF_USER);
    const avatarURL = await uploads.saveAvatar({ idUser: id, file: req.file });
    await Users.updateAvatar(id, avatarURL);
    res
      .status(HttpCode.OK)
      .json({ status: 'success', code: HttpCode.OK, data: { avatarURL } });
  } catch (error) {
    next(error);
  }
};

const verify = async (req, res, next) => {
  try {
    const user = await Users.findeByVerifyToken(req.params.token);
    if (user) {
      await Users.updateTokenVerify(user.id, true, null);
      return res
        .status(HttpCode.OK)
        .json({ status: 'success', code: 200, data: { message: 'Success!' } });
    }
    return res.status(HttpCode.BAD_REQUEST).json({
      status: 'success',
      code: HttpCode.BAD_REQUEST,
      data: { message: "Verification tocen isn't valid" },
    });
  } catch (error) {
    next(error);
  }
};

const repeatEmailVerification = async (req, res, next) => {};

module.exports = {
  register,
  login,
  logout,
  userUpdate,
  avatars,
  repeatEmailVerification,
  verify,
};
