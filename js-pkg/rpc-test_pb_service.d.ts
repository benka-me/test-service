// package: test
// file: rpc-test.proto

import * as rpc_test_pb from "./rpc-test_pb";
import * as test_pb from "./test_pb";
import {grpc} from "@improbable-eng/grpc-web";

type TestHelloWorld = {
  readonly methodName: string;
  readonly service: typeof Test;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof test_pb.Request;
  readonly responseType: typeof test_pb.Greeting;
};

export class Test {
  static readonly serviceName: string;
  static readonly HelloWorld: TestHelloWorld;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class TestClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  helloWorld(
    requestMessage: test_pb.Request,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: test_pb.Greeting|null) => void
  ): UnaryResponse;
  helloWorld(
    requestMessage: test_pb.Request,
    callback: (error: ServiceError|null, responseMessage: test_pb.Greeting|null) => void
  ): UnaryResponse;
}

