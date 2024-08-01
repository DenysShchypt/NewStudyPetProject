import {
  Location,
  Navigate,
  NavigateFunction,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import LoginPage from './Login';
import RegisterPage from './Register';
import { useAppDispatch, useAppSelector } from '../../utils/hook';
import { AppError } from '../../common/errors';
import { IFormData, IFormDataRegister } from '../../common/types/auth';
import { LoginSchema, RegisterSchema } from '../../utils/yup';
import { BoxFormStyled, RootStyled } from './styles';
import {
  loginUsers,
  refreshUsers,
  registerUsers,
} from '../../store/thunks/auth';
import { useEffect } from 'react';

const AuthRootComponent: React.FC = (): JSX.Element => {
  const location: Location = useLocation();
  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();
  const loading: boolean = useAppSelector(state => state.auth.isLoading);
  // useEffect(() => {dispatch(refreshUsers())}, []);
  // const firstNameUserAuth: string = useAppSelector(
  //   state => state.auth.user.firstName,
  // );
  // console.log(firstNameUserAuth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData | IFormDataRegister>({
    resolver: yupResolver(
      location.pathname === '/login' ? LoginSchema : RegisterSchema,
    ),
  });

  const handleSubmitForm: SubmitHandler<
    IFormData | IFormDataRegister
  > = async data => {
    if (location.pathname === '/login') {
      try {
        await dispatch(loginUsers(data));
        navigate('/');
      } catch (error) {
        return error;
      }
    } else {
      if (data.password === data.passwordRepeat) {
        try {
          const userData = {
            firstName: (data as IFormDataRegister).firstName,
            lastName: (data as IFormDataRegister).lastName,
            email: (data as IFormDataRegister).email,
            password: (data as IFormDataRegister).password,
            passwordRepeat: (data as IFormDataRegister).passwordRepeat,
          };

          await dispatch(registerUsers(userData));
          navigate('/');
        } catch (error) {
          return error;
        }
      } else {
        throw new Error(AppError.WRONG_PASSWORD_DO_NOT_MATCH);
      }
    }
  };
  return (
    <RootStyled>
      <form className="form" onSubmit={handleSubmit(handleSubmitForm)}>
        <BoxFormStyled>
          {location.pathname === '/login' ? (
            <LoginPage
              navigate={navigate}
              register={register}
              errors={errors}
              loading={loading}
            />
          ) : location.pathname === '/register' ? (
            <RegisterPage
              navigate={navigate}
              register={register}
              errors={errors}
              loading={loading}
            />
          ) : null}
        </BoxFormStyled>
      </form>
    </RootStyled>
  );
};

export default AuthRootComponent;
