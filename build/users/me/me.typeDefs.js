"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _apolloServerCore = require("apollo-server-core");

var _templateObject;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var _default = (0, _apolloServerCore.gql)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  type Query {\n    me: User\n  }\n"])));

exports["default"] = _default;