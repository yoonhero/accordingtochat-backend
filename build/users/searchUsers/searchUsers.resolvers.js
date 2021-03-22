"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _client = _interopRequireDefault(require("../../client"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = {
  Query: {
    searchUsers: function () {
      var _searchUsers = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_, _ref) {
        var keyword, users;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                keyword = _ref.keyword;
                _context.next = 3;
                return _client["default"].user.findMany({
                  where: {
                    username: {
                      startsWith: keyword.toLowerCase()
                    }
                  },
                  take: 10
                });

              case 3:
                users = _context.sent;
                return _context.abrupt("return", users);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function searchUsers(_x, _x2) {
        return _searchUsers.apply(this, arguments);
      }

      return searchUsers;
    }()
  }
};
exports["default"] = _default;