// authorizationMiddleware.js

const { Ability } = require('@casl/ability');
const { ForbiddenError } = require('@casl/ability/dist/errors');
const defineAbilitiesFor = require('./roles');

// Middleware function for checking user permissions
const authorizationMiddleware = (action, subject) => (req, res, next) => {
  const { can, cannot } = req.ability;

  // Check if the user is authorized to perform the action on the subject
  if (cannot(action, subject)) {
    throw new ForbiddenError('You are not authorized to perform this action');
  }

  next();
};

module.exports = authorizationMiddleware;
