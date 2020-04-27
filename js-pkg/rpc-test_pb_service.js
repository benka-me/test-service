// package: test
// file: rpc-test.proto

var rpc_test_pb = require("./rpc-test_pb");
var test_pb = require("./test_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var Test = (function () {
  function Test() {}
  Test.serviceName = "test.Test";
  return Test;
}());

Test.HelloWorld = {
  methodName: "HelloWorld",
  service: Test,
  requestStream: false,
  responseStream: false,
  requestType: test_pb.Request,
  responseType: test_pb.Greeting
};

exports.Test = Test;

function TestClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

TestClient.prototype.helloWorld = function helloWorld(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Test.HelloWorld, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.TestClient = TestClient;

