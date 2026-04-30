import { type NextFunction, type Request, type Response } from 'express';
import type { ComparePlayersAction } from '../../application/actions/compare-players.action';
import type { SearchPlayersAction } from '../../application/actions/search-players.action';
import { ComparePlayersBodyDto } from '../../domain/dto/compare-players.dto';
import { SearchPlayersQueryDto } from '../../domain/dto/search-players.dto';
import { validateDto } from '../../../../common/infrastructure/validators/dto-validation';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '../../../../common/infrastructure/swagger/swagger.decorators';
import type { ComparePlayersBody } from '../../domain/interfaces/compare-players-body.interface';
import type { SearchPlayersQuery } from '../../domain/interfaces/search-players-query.interface';

@ApiTags('Players')
export class PlayersController {
  constructor(
    private readonly searchPlayersAction: SearchPlayersAction,
    private readonly comparePlayersAction: ComparePlayersAction
  ) {}

  @ApiOperation({
    summary: 'Search players',
    description:
      'Search players by name and filter them by position, nationality, and age range. Pagination is supported through page and limit query params.',
  })
  @ApiResponse({
    status: 200,
    description: 'Players returned successfully',
  })
  public async searchPlayers(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const dto = validateDto(
        SearchPlayersQueryDto,
        request.query as object,
        'Invalid player search filters'
      ) as SearchPlayersQuery;
      const result = await this.searchPlayersAction.execute(dto);

      response.status(200).json({
        success: true,
        data: result.data,
        pagination: result.pagination,
      });
    } catch (error) {
      next(error);
    }
  }

  @ApiOperation({
    summary: 'Compare players',
    description:
      'Compare two or three players side by side using aggregated season statistics.',
  })
  @ApiResponse({
    status: 200,
    description: 'Comparison returned successfully',
  })
  public async comparePlayers(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const dto = validateDto(
        ComparePlayersBodyDto,
        request.body as object,
        'Invalid comparison payload'
      ) as ComparePlayersBody;
      const result = await this.comparePlayersAction.execute(dto);

      response.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
