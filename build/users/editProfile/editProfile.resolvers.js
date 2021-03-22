"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fs = require("fs");

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _client = _interopRequireDefault(require("../../client"));

var _users = require("../users.utils");

var _shared = require("../../shared/shared.utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = {
  Mutation: {
    editProfile: (0, _users.protectedResolver)( /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_, _ref, _ref2) {
        var firstName, lastName, username, email, newPassword, bio, avatar, loggedInUser, avatarUrl, uglyPassword, updatedUser;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                firstName = _ref.firstName, lastName = _ref.lastName, username = _ref.username, email = _ref.email, newPassword = _ref.password, bio = _ref.bio, avatar = _ref.avatar;
                loggedInUser = _ref2.loggedInUser;
                avatarUrl = null;

                if (!avatar) {
                  _context.next = 7;
                  break;
                }

                _context.next = 6;
                return (0, _shared.uploadToS3)(avatar, loggedInUser.id, "avatars");

              case 6:
                avatarUrl = _context.sent;

              case 7:
                uglyPassword = null;

                if (!newPassword) {
                  _context.next = 12;
                  break;
                }

                _context.next = 11;
                return _bcrypt["default"].hash(newPassword, 10);

              case 11:
                uglyPassword = _context.sent;

              case 12:
                _context.next = 14;
                return _client["default"].user.update({
                  where: {
                    id: loggedInUser.id
                  },
                  data: _objectSpread(_objectSpread({
                    firstName: firstName,
                    lastName: lastName,
                    username: username,
                    bio: bio,
                    email: email
                  }, uglyPassword && {
                    password: uglyPassword
                  }), avatarUrl && {
                    avatar: avatarUrl
                  })
                });

              case 14:
                updatedUser = _context.sent;

                if (!updatedUser.id) {
                  _context.next = 19;
                  break;
                }

                return _context.abrupt("return", {
                  ok: true
                });

              case 19:
                return _context.abrupt("return", {
                  ok: false,
                  error: "Could not update profile."
                });

              case 20:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x, _x2, _x3) {
        return _ref3.apply(this, arguments);
      };
    }())
  }
};
exports["default"] = _default;