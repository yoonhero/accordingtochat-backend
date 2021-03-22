"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvers = exports.typeDefs = void 0;

var _graphqlTools = require("graphql-tools");

var loadedTypes = (0, _graphqlTools.loadFilesSync)("".concat(__dirname, "/**/*.typeDefs.js"));
var loadedResolvers = (0, _graphqlTools.loadFilesSync)("".concat(__dirname, "/**/*.resolvers.js"));
var typeDefs = (0, _graphqlTools.mergeTypeDefs)(loadedTypes);
exports.typeDefs = typeDefs;
var resolvers = (0, _graphqlTools.mergeResolvers)(loadedResolvers);
exports.resolvers = resolvers;