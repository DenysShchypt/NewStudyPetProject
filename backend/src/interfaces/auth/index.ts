import { $Enums } from '@prisma/client';

export interface IJwtPlayLoad {
  user: IUserJWT;
  iat: number;
  exp: number;
}
export interface IUserJWT {
  email: string;
  firstName: string;
  lastName: string;
  roles: $Enums.Role[];
}
