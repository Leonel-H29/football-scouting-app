import { IsEmail, IsString, Length, Matches } from 'class-validator';
import { ApiProperty } from '../../../../common/infrastructure/swagger/swagger.decorators';
import type { RegisterRequest } from '../interfaces/register-request.interface';

const NAME_REGEX = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/;
const USERNAME_REGEX = /^[a-zA-Z0-9._-]+$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/;

export class RegisterDto implements RegisterRequest {
  @ApiProperty({ description: 'First name', example: 'Lionel' })
  @IsString()
  @Length(2, 60)
  @Matches(NAME_REGEX, {
    message: 'name contains invalid characters',
  })
  name!: string;

  @ApiProperty({ description: 'Last name', example: 'Messi' })
  @IsString()
  @Length(2, 60)
  @Matches(NAME_REGEX, {
    message: 'surname contains invalid characters',
  })
  surname!: string;

  @ApiProperty({ description: 'Unique email', example: 'leo@example.com' })
  @IsEmail()
  @Length(6, 254)
  email!: string;

  @ApiProperty({ description: 'Unique username', example: 'leo.messi10' })
  @IsString()
  @Length(4, 30)
  @Matches(USERNAME_REGEX, {
    message: 'username contains invalid characters',
  })
  username!: string;

  @ApiProperty({
    description: 'Password with upper/lowercase, number and symbol',
    example: 'StrongPass1!',
  })
  @IsString()
  @Length(8, 128)
  @Matches(PASSWORD_REGEX, {
    message: 'password must include uppercase, lowercase, number and symbol',
  })
  password!: string;

  @ApiProperty({
    description: 'Password confirmation',
    example: 'StrongPass1!',
  })
  @IsString()
  @Length(8, 128)
  confirmPassword!: string;
}
