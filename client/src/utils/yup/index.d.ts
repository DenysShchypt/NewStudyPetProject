import * as yup from 'yup';
export declare const LoginSchema: yup.ObjectSchema<{
    email: string;
    password: string;
}, yup.AnyObject, {
    email: undefined;
    password: undefined;
}, "">;
export declare const RegisterSchema: yup.ObjectSchema<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    passwordRepeat: string;
}, yup.AnyObject, {
    firstName: undefined;
    lastName: undefined;
    email: undefined;
    password: undefined;
    passwordRepeat: undefined;
}, "">;
