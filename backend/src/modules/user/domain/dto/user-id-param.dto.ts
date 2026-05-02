import { IsUUID } from 'class-validator';
import { ApiProperty } from '../../../../common/infrastructure/swagger/swagger.decorators';

export class UserIdParamDto {
  @ApiProperty({
    description: 'User identifier',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  id!: string;
}
