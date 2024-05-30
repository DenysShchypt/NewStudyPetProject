import { useLocation, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Box } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import LoginPage from './Login';
import RegisterPage from './Register';
import { instance } from '../../utils/axios';
import { useAppDispatch } from '../../utils/hook';
import { login } from '../../store/slice/auth';
import { AppError } from '../../common/errors';
import { IFormData, IFormDataRegister } from '../../common/types/auth';
import { LoginSchema, RegisterSchema } from '../../utils/yup';
import { BoxFormStyled, RootStyled } from './styles';

const AuthRootComponent: React.FC = (): JSX.Element => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
        const userData = {
          email: (data as IFormData).email,
          password: (data as IFormData).password,
        };
        const user = await instance.post('auth/login', userData);
        dispatch(login(user.data));
        navigate('/');
      } catch (error) {
        return error;
      }
    } else {
      if (data.password === data.repeatPassword) {
        try {
          const userData = {
            firstName: (data as IFormDataRegister).firstName,
            lastName: (data as IFormDataRegister).lastName,
            email: (data as IFormDataRegister).email,
            password: (data as IFormDataRegister).password,
          };
          const newUser = await instance.post('auth/register', userData);
          dispatch(login(newUser.data));
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
            />
          ) : location.pathname === '/register' ? (
            <RegisterPage
              navigate={navigate}
              register={register}
              errors={errors}
            />
          ) : null}
        </BoxFormStyled>
      </form>
    </RootStyled>
  );
};

export default AuthRootComponent;
