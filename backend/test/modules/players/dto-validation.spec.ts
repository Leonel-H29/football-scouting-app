import { validateDto } from '../../../src/common/infrastructure/validators/dto-validation';
import { ValidationError } from '../../../src/common/domain/errors/validation-error';
import { SearchPlayersQueryDto } from '../../../src/modules/players/domain/dto/search-players.dto';
import { ComparePlayersBodyDto } from '../../../src/modules/players/domain/dto/compare-players.dto';

describe('DTO validation', () => {
  it('transforms query strings into typed search criteria', () => {
    const dto = validateDto(
      SearchPlayersQueryDto,
      {
        name: ' Lautaro ',
        position: 'FORWARD',
        nationality: 'Argentina',
        minAge: '20',
        maxAge: '30'
      },
      'Invalid player search filters'
    );

    expect(dto.minAge).toBe(20);
    expect(dto.maxAge).toBe(30);
    expect(dto.name).toBe(' Lautaro ');
  });

  it('rejects duplicate player ids in comparison payload', () => {
    expect(() => {
      validateDto(
        ComparePlayersBodyDto,
        {
          playerIds: ['player-1', 'player-1']
        },
        'Invalid comparison payload'
      );
    }).toThrow(ValidationError);
  });
});
