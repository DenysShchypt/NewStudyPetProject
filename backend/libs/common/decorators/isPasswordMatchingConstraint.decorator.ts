import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { CreateUserDTO } from '../../../src/modules/users/dto';
import { AppError } from '../../../src/common/constants/errors';
// Audit compare passwords
@ValidatorConstraint({ name: 'IsPasswordsMatching', async: false })
export class IsPasswordsMatching implements ValidatorConstraintInterface {
  validate(passwordRepeat: string, args: ValidationArguments) {
    const obj = args.object as CreateUserDTO;
    return obj.password === passwordRepeat;
  }

  defaultMessage(): string {
    return AppError.USER_NOT_FOUND;
  }
}
