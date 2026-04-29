import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import {
  ApiProperty,
  ApiPropertyOptional,
} from '../../../../common/infrastructure/swagger/swagger.decorators';
import type { ComparePlayersBody } from '../interfaces/compare-players-body.interface';

export class ComparePlayersBodyDto implements ComparePlayersBody {
  @ApiProperty({
    description: 'Player identifiers to compare',
    example: ['player-1', 'player-2'],
  })
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(3)
  @ArrayUnique()
  @IsString({ each: true })
  @Length(1, 100, { each: true })
  playerIds!: ReadonlyArray<string>;

  @ApiPropertyOptional({
    description:
      'Optional season id; when omitted, the latest common season is selected',
    example: 'season-2024',
  })
  @IsOptional()
  @IsString()
  @Length(1, 100)
  seasonId?: string;
}
