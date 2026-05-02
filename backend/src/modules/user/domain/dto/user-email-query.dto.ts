import { IsEmail, Length } from 'class-validator';
import { ApiProperty } from '../../../../common/infrastructure/swagger/swagger.decorators';

export class UserEmailQueryDto {
  @ApiProperty({ description: 'User email', example: 'leo@example.com' })
  @IsEmail()
  @Length(6, 254)
  email!: string;
}
