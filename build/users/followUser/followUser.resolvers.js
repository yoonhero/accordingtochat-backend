"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _client = _interopRequireDefault(require("../../client"));

var _users = require("../users.utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = {
  Mutation: {
    followUser: (0, _users.protectedResolver)( /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_, _ref, _ref2) {
        var username, loggedInUser, ok;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                username = _ref.username;
                loggedInUser = _ref2.loggedInUser;
                _context.next = 4;
                return _client["default"].user.findUnique({
                  where: {
                    username: username
                  }
                });

              case 4:
                ok = _context.sent;

                if (ok) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt("return", {
                  ok: false,
                  error: "That user does not exist."
                });

              case 7:
                _context.next = 9;
                return _client["default"].user.update({
                  where: {
                    id: loggedInUser.id
                  },
                  data: {
                    following: {
                      connect: {
                        username: username
                      }
                    }
                  }
                });

              case 9:
                return _context.abrupt("return", {
                  ok: true
                });

              case 10:
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