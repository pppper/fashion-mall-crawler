import { Exception } from "../classes/Exception.class";

namespace Exceptions {
  export class UnimplementedException extends Exception {}
  export class InvalidZigZagAuthenticationStrategyEnum extends Exception {}
  export class ZigZagLoginFailedException extends Exception {}
}

export default Exceptions;
