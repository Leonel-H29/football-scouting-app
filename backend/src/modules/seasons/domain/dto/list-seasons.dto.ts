import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Length, Max, Min } from 'class-validator';
import { ApiPropertyOptional } from '../../../../common/infrastructure/swagger/swagger.decorators';
import type { ListSeasonsQuery } from '../interfaces/list-seasons-query.interface';

export class ListSeasonsQueryDto implements ListSeasonsQuery {
  @ApiPropertyOptional({
    description: 'Filter seasons by year',
    example: 2024
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1900)
  @Max(2100)
  year?: number;

  @ApiPropertyOptional({
    description: 'Filter seasons by name',
    example: '2024/25'
  })
  @IsOptional()
  @IsString()
  @Length(1, 100)
  name?: string;
}
