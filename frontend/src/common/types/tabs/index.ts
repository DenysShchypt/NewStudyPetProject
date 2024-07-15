import { IWatchList } from '../watchList';

export interface ITabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export interface IUpdateUser {
  firstName: string;
  lastName: string;
  email: string;
}

export interface IInfoUserState {
  user: ICurrentUser;
  token: string;
}

export interface ICurrentUser {
  wallet: number;
  email: string;
  firstName: string;
  lastName: string;
  id: number | undefined;
  roles: never[];
  password: string;
}
export interface IUpdateUserPassword {
  password: string;
  newPassword: string;
}
