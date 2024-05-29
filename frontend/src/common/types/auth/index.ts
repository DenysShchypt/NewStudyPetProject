export interface IPropsLogin {
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  navigate: (to: string) => void;
}
export interface IPropsRegister {
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  setRepeatPassword: (value: string) => void;
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
  navigate: (to: string) => void;
}

export interface IAuthState {
  user: IPublicUser;
  isLoggedIn: boolean;
}

export interface IPublicUser {
  user: {
    id: number | null;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    watchList: [IWatchList];
  };
  token: string;
}

export interface IWatchList {
  id: number | null;
  user: number | null;
  name: string;
  assetId: string;
  createdAt: string;
  updatedAt: string;
}
