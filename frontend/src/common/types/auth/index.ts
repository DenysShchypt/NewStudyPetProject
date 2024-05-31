import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

export interface IPropsLogin<
  TFieldValues extends IFormData = IFormData,
  TContext = any,
> {
  navigate: (to: string) => void;
  register: UseFormRegister<IFormData>;
  errors: FieldErrors<TFieldValues>;
  loading: boolean;
}
export interface IPropsRegister<
  TFieldValues extends IFormDataRegister = IFormDataRegister,
  TContext = any,
> {
  register: UseFormRegister<IFormDataRegister | IFormData>;
  navigate: (to: string) => void;
  errors: FieldErrors<TFieldValues>;
  loading: boolean;
}

export interface IAuthState {
  user: IPublicUser;
  isLoggedIn: boolean;
  isLoading: boolean;
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

export interface IFormData extends FieldValues {
  email: string;
  password: string;
}
export interface IFormDataRegister extends IFormData {
  firstName: string;
  lastName: string;
  repeatPassword: string;
}
