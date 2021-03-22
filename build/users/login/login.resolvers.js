"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _client = _interopRequireDefault(require("../../client"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = {
  Mutation: {
    login: function () {
      var _login = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_, _ref) {
        var username, password, user, passwordOk, token;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                username = _ref.username, password = _ref.password;
                _context.next = 3;
                return _client["default"].user.findFirst({
                  where: {
                    username: username
                  }
                });

              case 3:
                user = _context.sent;

                if (user) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt("return", {
                  ok: false,
                  error: "User not found"
                });

              case 6:
                _context.next = 8;
                return _bcrypt["default"].compare(password, user.password);

              case 8:
                passwordOk = _context.sent;

                if (passwordOk) {
                  _context.next = 11;
                  break;
                }

                return _context.abrupt("return", {
                  ok: false,
                  error: "Incorrect password."
                });

              case 11:
                _context.next = 13;
                return _jsonwebtoken["default"].sign({
                  id: user.id
                }, process.env.SECRET_KEY);

              case 13:
                token = _context.sent;
                return _context.abrupt("return", {
                  ok: true,
                  token: token
                });

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function login(_x, _x2) {
        return _login.apply(this, arguments);
      }

      return login;
    }()
  }
};
exports["default"] = _default;