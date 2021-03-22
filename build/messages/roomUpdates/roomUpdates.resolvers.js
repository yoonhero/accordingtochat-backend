"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _apolloServer = require("apollo-server");

var _client = _interopRequireDefault(require("../../client"));

var _constants = require("../../constants");

var _pubsub = _interopRequireDefault(require("../../pubsub"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = {
  Subscription: {
    roomUpdates: {
      subscribe: function () {
        var _subscribe = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(root, args, context, info) {
          var room;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return _client["default"].room.findFirst({
                    where: {
                      id: args.id,
                      users: {
                        some: {
                          id: context.loggedInUser.id
                        }
                      }
                    },
                    select: {
                      id: true
                    }
                  });

                case 2:
                  room = _context2.sent;

                  if (room) {
                    _context2.next = 5;
                    break;
                  }

                  throw new Error("You shall not see this.");

                case 5:
                  console.log(root);
                  return _context2.abrupt("return", (0, _apolloServer.withFilter)(function () {
                    return _pubsub["default"].asyncIterator(_constants.NEW_MESSAGE);
                  }, /*#__PURE__*/function () {
                    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref, _ref2, _ref3) {
                      var roomUpdates, id, loggedInUser, _room;

                      return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                          switch (_context.prev = _context.next) {
                            case 0:
                              roomUpdates = _ref.roomUpdates;
                              id = _ref2.id;
                              loggedInUser = _ref3.loggedInUser;

                              if (!(roomUpdates.roomId === id)) {
                                _context.next = 10;
                                break;
                              }

                              _context.next = 6;
                              return _client["default"].room.findFirst({
                                where: {
                                  id: id,
                                  users: {
                                    some: {
                                      id: loggedInUser.id
                                    }
                                  }
                                },
                                select: {
                                  id: true
                                }
                              });

                            case 6:
                              _room = _context.sent;

                              if (_room) {
                                _context.next = 9;
                                break;
                              }

                              return _context.abrupt("return", false);

                            case 9:
                              return _context.abrupt("return", true);

                            case 10:
                            case "end":
                              return _context.stop();
                          }
                        }
                      }, _callee);
                    }));

                    return function (_x5, _x6, _x7) {
                      return _ref4.apply(this, arguments);
                    };
                  }())(root, args, context, info));

                case 7:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        function subscribe(_x, _x2, _x3, _x4) {
          return _subscribe.apply(this, arguments);
        }

        return subscribe;
      }()
    }
  }
};
exports["default"] = _default;