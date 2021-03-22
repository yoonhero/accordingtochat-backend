"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadToS3 = void 0;

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_awsSdk["default"].config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET
  }
});

var uploadToS3 = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(file, userId, folderName) {
    var _yield$file, filename, createReadStream, readStream, objectName, _yield$AWS$S3$upload$, Location;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(file);
            _context.next = 3;
            return file;

          case 3:
            _yield$file = _context.sent;
            filename = _yield$file.filename;
            createReadStream = _yield$file.createReadStream;
            readStream = createReadStream();
            objectName = "".concat(folderName, "/").concat(userId, "-").concat(filename);
            _context.next = 10;
            return new _awsSdk["default"].S3().upload({
              Bucket: "accordingtocoding-chatapp",
              Key: objectName,
              ACL: "public-read",
              Body: readStream
            }).promise();

          case 10:
            _yield$AWS$S3$upload$ = _context.sent;
            Location = _yield$AWS$S3$upload$.Location;
            return _context.abrupt("return", Location);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function uploadToS3(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.uploadToS3 = uploadToS3;