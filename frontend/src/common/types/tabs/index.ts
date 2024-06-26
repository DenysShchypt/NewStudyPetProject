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
  createdAt?: string;
  email: string;
  firstName: string;
  id?: number;
  lastName: string;
  updatedAt?: string;
  watchList?: IWatchList[];
}
export interface IUpdateUserPassword {
  password: string;
  newPassword: string;
}
