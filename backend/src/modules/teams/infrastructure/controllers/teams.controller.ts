import { type NextFunction, type Request, type Response } from 'express';
import type { ListTeamsAction } from '../../application/actions/list-teams.action';
import { ListTeamsQueryDto } from '../../domain/dto/list-teams.dto';
import { validateDto } from '../../../../common/infrastructure/validators/dto-validation';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '../../../../common/infrastructure/swagger/swagger.decorators';
import type { ListTeamsQuery } from '../../domain/interfaces/list-teams-query.interface';

@ApiTags('Teams')
export class TeamsController {
  constructor(private readonly listTeamsAction: ListTeamsAction) {}

  @ApiOperation({
    summary: 'List teams',
    description: 'List teams with optional filters by name and country.',
  })
  @ApiResponse({
    status: 200,
    description: 'Teams returned successfully',
  })
  public async listTeams(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const dto = validateDto(
        ListTeamsQueryDto,
        request.query as object,
        'Invalid team filters'
      ) as ListTeamsQuery;
      const result = await this.listTeamsAction.execute(dto);

      response.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
