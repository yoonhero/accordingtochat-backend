"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _client = _interopRequireDefault(require("../../client"));

var _users = require("../users.utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  Query: {
    me: (0, _users.protectedResolver)(function (_, __, _ref) {
      var loggedInUser = _ref.loggedInUser;
      return _client["default"].user.findUnique({
        where: {
          id: loggedInUser.id
        }
      });
    })
  }
};
exports["default"] = _default;