import { $Enums, Provider } from '@prisma/client';

export interface IJwtPlayLoad {
  user: IUserJWT;
  iat: number;
  exp: number;
}
export interface IUserJWT {
  id: string;
  email: string;
  firstName: string;
  lastName?: string;
  roles: $Enums.Role[];
}
export interface IAccessToken {
  token: string;
  exp: Date;
  userId: string;
  userAgent: string;
}
export interface IToken {
  token: string;
  refreshToken: IAccessToken;
}
interface IBearerToken {
  token: string;
  refreshToken: IAccessToken;
}
export interface ITokenAndUser {
  wallet: number;
  id: string;
  email: string;
  firstName: string;
  lastName?: string;
  roles: $Enums.Role[];
  token: IBearerToken;
  provider?: Provider;
}
export interface ICurrentUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: $Enums.Role[];
}
