const xss = require('xss');
const bcrypt = require('bcryptjs');

const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/;

const UsersService = {
  hasUserWithUserName(db, username) {
    return db('users')
      .where({ username })
      .first()
      .then(user => !!user);
  },
  insertUser(db, newUser) {
    return db
      .insert(newUser)
      .into('users')
      .returning('*')
      .then(([user]) => user);
  },
  validateType(type) {
    if (type !== 'parent' && type !== 'teacher') {
      return `Type must be either 'parent' or 'teacher'`
    }
  },
  validatePassword(password) {
    if (password.length < 8) {
      return 'Password must be longer than 8 characters'
    };
    if (password.length > 72) {
      return 'Password must be less than 72 characters'
    };
    if (password.startsWith(' ') || password.endsWith(' ')) {
      return 'Password must not start or end with an empty space'
    };
    if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
      return 'Password must contain 1 of each: upper case, lower case, number and special character.'
    };
    return null;
  },
  hashPassword(password) {
    return bcrypt.hash(password, 12);
  },
  serializeUser(user) {
    return {
      id: user.id,
      username: xss(user.username),
      type: xss(user.type)
    };
  },
};

module.exports = UsersService;