import MallEnum from "../enums/Malls.enum";

export abstract class AbstractAuthenticationCredentials {
  mall: MallEnum;
  constructor(mall: MallEnum) {
    this.mall = mall;
  }
}

export enum ZigZagAuthenticationStrategyEnum {
  USE_EMAIL_AND_PASSWORD,
}

export class ZigZagAuthenticationCredentials extends AbstractAuthenticationCredentials {
  strategy: ZigZagAuthenticationStrategyEnum;

  constructor(strategy: ZigZagAuthenticationStrategyEnum) {
    super(MallEnum.ZIGZAG);
    this.strategy = strategy;
  }

  email?: string;
  password?: string;

  static fromEmailAndPassword(email: string, password: string) {
    const authenticationCredentials = new ZigZagAuthenticationCredentials(
      ZigZagAuthenticationStrategyEnum.USE_EMAIL_AND_PASSWORD
    );
    authenticationCredentials.email = email;
    authenticationCredentials.password = password;

    return authenticationCredentials;
  }
}
