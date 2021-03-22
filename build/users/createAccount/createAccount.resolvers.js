"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _client = _interopRequireDefault(require("../../client"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = {
  Mutation: {
    createAccount: function () {
      var _createAccount = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_, _ref) {
        var firstName, lastName, username, email, password, existingUser, uglyPassword;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                firstName = _ref.firstName, lastName = _ref.lastName, username = _ref.username, email = _ref.email, password = _ref.password;
                _context.prev = 1;
                _context.next = 4;
                return _client["default"].user.findFirst({
                  where: {
                    OR: [{
                      username: username
                    }, {
                      email: email
                    }]
                  }
                });

              case 4:
                existingUser = _context.sent;

                if (!existingUser) {
                  _context.next = 7;
                  break;
                }

                throw new Error("This username/password is already taken.");

              case 7:
                _context.next = 9;
                return _bcrypt["default"].hash(password, 10);

              case 9:
                uglyPassword = _context.sent;
                _context.next = 12;
                return _client["default"].user.create({
                  data: {
                    username: username,
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    password: uglyPassword
                  }
                });

              case 12:
                return _context.abrupt("return", {
                  ok: true
                });

              case 15:
                _context.prev = 15;
                _context.t0 = _context["catch"](1);
                return _context.abrupt("return", {
                  ok: false,
                  error: "Can't create account."
                });

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 15]]);
      }));

      function createAccount(_x, _x2) {
        return _createAccount.apply(this, arguments);
      }

      return createAccount;
    }()
  }
};
exports["default"] = _default;