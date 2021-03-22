"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _client = _interopRequireDefault(require("../client"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  User: {
    isMe: function isMe(_ref, _, _ref2) {
      var id = _ref.id;
      var loggedInUser = _ref2.loggedInUser;

      if (!loggedInUser) {
        return false;
      }

      return id === loggedInUser.id;
    }
  }
};
exports["default"] = _default;