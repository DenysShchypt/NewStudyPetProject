export interface IPropsLogin {
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
}
export interface IPropsRegister {
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  setRepeatPassword: (value: string) => void;
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
}
