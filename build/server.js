"use strict";

var _http = _interopRequireDefault(require("http"));

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _apolloServerExpress = require("apollo-server-express");

var _schema = require("./schema");

var _users = require("./users/users.utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

require("dotenv").config();

var apollo = new _apolloServerExpress.ApolloServer({
  resolvers: _schema.resolvers,
  typeDefs: _schema.typeDefs,
  context: function () {
    var _context = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx) {
      var _context2;

      return regeneratorRuntime.wrap(function _callee$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!ctx.req) {
                _context3.next = 7;
                break;
              }

              _context3.next = 3;
              return (0, _users.getUser)(ctx.req.headers.token);

            case 3:
              _context3.t0 = _context3.sent;
              return _context3.abrupt("return", {
                loggedInUser: _context3.t0
              });

            case 7:
              _context2 = ctx.connection.context;
              return _context3.abrupt("return", {
                loggedInUser: _context2.loggedInUser
              });

            case 9:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee);
    }));

    function context(_x) {
      return _context.apply(this, arguments);
    }

    return context;
  }(),
  subscriptions: {
    onConnect: function () {
      var _onConnect = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref) {
        var token, user;
        return regeneratorRuntime.wrap(function _callee2$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                token = _ref.token;

                if (token) {
                  _context4.next = 3;
                  break;
                }

                throw new Error("You can't listen.");

              case 3:
                _context4.next = 5;
                return (0, _users.getUser)(token);

              case 5:
                user = _context4.sent;
                return _context4.abrupt("return", {
                  loggedInUser: user
                });

              case 7:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee2);
      }));

      function onConnect(_x2) {
        return _onConnect.apply(this, arguments);
      }

      return onConnect;
    }()
  }
});
var PORT = process.env.PORT;
var app = (0, _express["default"])();
app.use((0, _morgan["default"])("tiny"));
apollo.applyMiddleware({
  app: app
});
app.use("/static", _express["default"]["static"]("uploads"));

var httpServer = _http["default"].createServer(app);

apollo.installSubscriptionHandlers(httpServer);
httpServer.listen(PORT, function () {
  console.log("\uD83D\uDE80 Server is running on http://localhost:".concat(PORT, " \u2705"));
});