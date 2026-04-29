import { IsString, Length, Matches } from 'class-validator';
import { ApiProperty } from '../../../../common/infrastructure/swagger/swagger.decorators';
import type { LoginRequest } from '../interfaces/login-request.interface';

const USERNAME_REGEX = /^[a-zA-Z0-9._-]+$/;

export class LoginDto implements LoginRequest {
  @ApiProperty({ description: 'Username', example: 'leo.messi10' })
  @IsString()
  @Length(4, 30)
  @Matches(USERNAME_REGEX, {
    message: 'username contains invalid characters',
  })
  username!: string;

  @ApiProperty({ description: 'User password', example: 'StrongPass1!' })
  @IsString()
  @Length(8, 128)
  password!: string;
}
