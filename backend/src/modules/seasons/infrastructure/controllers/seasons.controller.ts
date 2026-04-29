import { type NextFunction, type Request, type Response } from 'express';
import type { ListSeasonsAction } from '../../application/actions/list-seasons.action';
import { ListSeasonsQueryDto } from '../../domain/dto/list-seasons.dto';
import { validateDto } from '../../../../common/infrastructure/validators/dto-validation';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '../../../../common/infrastructure/swagger/swagger.decorators';
import type { ListSeasonsQuery } from '../../domain/interfaces/list-seasons-query.interface';

@ApiTags('Seasons')
export class SeasonsController {
  constructor(private readonly listSeasonsAction: ListSeasonsAction) {}

  @ApiOperation({
    summary: 'List seasons',
    description: 'List seasons with optional filters by year and name.',
  })
  @ApiResponse({
    status: 200,
    description: 'Seasons returned successfully',
  })
  public async listSeasons(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const dto = validateDto(
        ListSeasonsQueryDto,
        request.query as object,
        'Invalid season filters'
      ) as ListSeasonsQuery;
      const result = await this.listSeasonsAction.execute(dto);

      response.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
