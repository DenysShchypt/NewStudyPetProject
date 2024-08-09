export interface ITabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export interface IUpdateUser {
  firstName: string;
  lastName?: string;
  email: string;
}

export interface IInfoUserState {
  user: ICurrentUser;
}

export interface ICurrentUser {
  wallet: number;
  email: string;
  firstName: string;
  lastName?: string;
  id: string;
  roles: never[];
}
export interface IUpdateUserPassword {
  password: string;
  newPassword: string;
}
