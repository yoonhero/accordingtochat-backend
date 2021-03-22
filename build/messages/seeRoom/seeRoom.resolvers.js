"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _client = _interopRequireDefault(require("../../client"));

var _users = require("../../users/users.utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  Query: {
    seeRoom: (0, _users.protectedResolver)(function (_, _ref, _ref2) {
      var id = _ref.id;
      var loggedInUser = _ref2.loggedInUser;
      return _client["default"].room.findFirst({
        where: {
          id: id,
          users: {
            some: {
              id: loggedInUser.id
            }
          }
        }
      });
    })
  }
};
exports["default"] = _default;