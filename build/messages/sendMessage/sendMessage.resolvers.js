"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _client = _interopRequireDefault(require("../../client"));

var _constants = require("../../constants");

var _pubsub = _interopRequireDefault(require("../../pubsub"));

var _users = require("../../users/users.utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = {
  Mutation: {
    sendMessage: (0, _users.protectedResolver)( /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_, _ref, _ref2) {
        var payload, roomId, userId, loggedInUser, room, user, message;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                payload = _ref.payload, roomId = _ref.roomId, userId = _ref.userId;
                loggedInUser = _ref2.loggedInUser;
                room = null;

                if (!userId) {
                  _context.next = 14;
                  break;
                }

                _context.next = 6;
                return _client["default"].user.findUnique({
                  where: {
                    id: userId
                  },
                  select: {
                    id: true
                  }
                });

              case 6:
                user = _context.sent;

                if (user) {
                  _context.next = 9;
                  break;
                }

                return _context.abrupt("return", {
                  ok: false,
                  error: "This user does not exist."
                });

              case 9:
                _context.next = 11;
                return _client["default"].room.create({
                  data: {
                    users: {
                      connect: [{
                        id: userId
                      }, {
                        id: loggedInUser.id
                      }]
                    }
                  }
                });

              case 11:
                room = _context.sent;
                _context.next = 20;
                break;

              case 14:
                if (!roomId) {
                  _context.next = 20;
                  break;
                }

                _context.next = 17;
                return _client["default"].room.findUnique({
                  where: {
                    id: roomId
                  },
                  select: {
                    id: true
                  }
                });

              case 17:
                room = _context.sent;

                if (room) {
                  _context.next = 20;
                  break;
                }

                return _context.abrupt("return", {
                  ok: false,
                  error: "Room not found."
                });

              case 20:
                _context.next = 22;
                return _client["default"].message.create({
                  data: {
                    payload: payload,
                    room: {
                      connect: {
                        id: room.id
                      }
                    },
                    user: {
                      connect: {
                        id: loggedInUser.id
                      }
                    }
                  }
                });

              case 22:
                message = _context.sent;

                _pubsub["default"].publish(_constants.NEW_MESSAGE, {
                  roomUpdates: _objectSpread({}, message)
                });

                return _context.abrupt("return", {
                  id: message.id,
                  ok: true
                });

              case 25:
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