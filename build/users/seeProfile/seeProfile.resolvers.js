"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _client = _interopRequireDefault(require("../../client"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  Query: {
    seeProfile: function seeProfile(_, _ref) {
      var username = _ref.username;
      return _client["default"].user.findUnique({
        where: {
          username: username
        },
        // load all user
        include: {
          following: true,
          followers: true
        }
      });
    }
  }
};
exports["default"] = _default;