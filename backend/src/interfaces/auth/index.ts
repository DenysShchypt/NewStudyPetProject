import { $Enums } from '@prisma/client';

export interface IJwtPlayLoad {
  user: IUserJWT;
  iat: number;
  exp: number;
}
export interface IUserJWT {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
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

// export interface INewUser {
//   wallet: number;
//   email: string;
//   firstName: string;
//   lastName: string;
//   id: string;
//   roles: $Enums.Role[];
//   provider: string;
//   providerId: string;
//   createAt: Date;
//   updateAt: Date;
//   picture: string;
// }
