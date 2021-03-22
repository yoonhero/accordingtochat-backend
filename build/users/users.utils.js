"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.protectedResolver = protectedResolver;
exports.getUser = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _client = _interopRequireDefault(require("../client"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getUser = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(token) {
    var _yield$jwt$verify, id, user;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;

            if (token) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", null);

          case 3:
            _context.next = 5;
            return _jsonwebtoken["default"].verify(token, process.env.SECRET_KEY);

          case 5:
            _yield$jwt$verify = _context.sent;
            id = _yield$jwt$verify.id;
            _context.next = 9;
            return _client["default"].user.findUnique({
              where: {
                id: id
              }
            });

          case 9:
            user = _context.sent;

            if (!user) {
              _context.next = 14;
              break;
            }

            return _context.abrupt("return", user);

          case 14:
            return _context.abrupt("return", null);

          case 15:
            _context.next = 20;
            break;

          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", null);

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 17]]);
  }));

  return function getUser(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.getUser = getUser;

function protectedResolver(ourResolver) {
  return function (root, args, context, info) {
    if (!context.loggedInUser) {
      var query = info.operation.operation === "query";

      if (query) {
        return null;
      } else {
        return {
          ok: false,
          error: "Please log in to perform this action"
        };
      }
    }

    return ourResolver(root, args, context, info);
  };
}