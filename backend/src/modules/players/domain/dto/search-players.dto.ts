import { Type } from 'class-transformer';
import {
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { ApiPropertyOptional } from '../../../../common/infrastructure/swagger/swagger.decorators';
import {
  PLAYER_POSITIONS,
  type PlayerPosition,
} from '../interfaces/player-position.interface';
import type { SearchPlayersQuery } from '../interfaces/search-players-query.interface';

export class SearchPlayersQueryDto implements SearchPlayersQuery {
  @ApiPropertyOptional({
    description: 'Search players by name',
    example: 'Lautaro',
  })
  @IsOptional()
  @IsString()
  @Length(1, 100)
  name?: string;

  @ApiPropertyOptional({
    description: 'Filter by player position',
    enum: PLAYER_POSITIONS,
  })
  @IsOptional()
  @IsIn(PLAYER_POSITIONS)
  position?: PlayerPosition;

  @ApiPropertyOptional({
    description: 'Filter by nationality',
    example: 'Argentina',
  })
  @IsOptional()
  @IsString()
  @Length(2, 56)
  nationality?: string;

  @ApiPropertyOptional({
    description: 'Minimum age',
    example: 20,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(15)
  @Max(50)
  minAge?: number;

  @ApiPropertyOptional({
    description: 'Maximum age',
    example: 30,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(15)
  @Max(50)
  maxAge?: number;

  @ApiPropertyOptional({
    description: 'Page number for offset-based pagination',
    example: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({
    description: 'Items per page',
    example: 20,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number;
}
