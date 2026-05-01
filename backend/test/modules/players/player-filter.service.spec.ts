import { PlayerFilterServiceImpl } from '../../../src/modules/players/application/services/player-filter.service';
import { PlayerPositionEnum } from '../../../src/modules/players/domain/enums/player-position.enum';

describe('PlayerFilterServiceImpl', () => {
  it('builds birth date boundaries from age range', () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-04-28T12:00:00.000Z'));

    const service = new PlayerFilterServiceImpl();
    const criteria = service.buildCriteria({
      minAge: 20,
      maxAge: 30,
      name: ' Messi ',
      nationality: ' Argentina ',
      position: PlayerPositionEnum.FORWARD,
    });

    expect(criteria.name).toBe('Messi');
    expect(criteria.nationality).toBe('Argentina');
    expect(criteria.birthDateTo?.toISOString()).toBe(
      '2006-04-28T00:00:00.000Z'
    );
    expect(criteria.birthDateFrom?.toISOString()).toBe(
      '1995-04-29T00:00:00.000Z'
    );

    jest.useRealTimers();
  });
});
