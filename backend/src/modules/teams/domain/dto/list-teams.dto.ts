import { Length, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '../../../../common/infrastructure/swagger/swagger.decorators';
import type { ListTeamsQuery } from '../interfaces/list-teams-query.interface';

export class ListTeamsQueryDto implements ListTeamsQuery {
  @ApiPropertyOptional({
    description: 'Filter teams by name',
    example: 'River'
  })
  @IsOptional()
  @IsString()
  @Length(2, 100)
  name?: string;

  @ApiPropertyOptional({
    description: 'Filter teams by country',
    example: 'Argentina'
  })
  @IsOptional()
  @IsString()
  @Length(2, 56)
  country?: string;
}
