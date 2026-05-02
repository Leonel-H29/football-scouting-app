import { type NextFunction, type Request, type Response } from 'express';
import { UnauthorizedError } from '../../../../common/domain/errors/unauthorized-error';
import { validateDto } from '../../../../common/infrastructure/validators/dto-validation';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '../../../../common/infrastructure/swagger/swagger.decorators';
import { FindUserByEmailAction } from '../../../user/application/actions/find-user-by-email.action';
import { FindUserByIdAction } from '../../../user/application/actions/find-user-by-id.action';
import { GetUserPasswordByEmailAction } from '../../../user/application/actions/get-user-password-by-email.action';
import { UpdateUserAction } from '../../../user/application/actions/update-user.action';
import { UpdateUserDto } from '../../../user/domain/dto/update-user.dto';
import { UserEmailQueryDto } from '../../../user/domain/dto/user-email-query.dto';
import { UserIdParamDto } from '../../../user/domain/dto/user-id-param.dto';

@ApiTags('Users')
export class UsersController {
  constructor(
    private readonly findUserByIdAction: FindUserByIdAction,
    private readonly findUserByEmailAction: FindUserByEmailAction,
    private readonly updateUserAction: UpdateUserAction,
    private readonly getUserPasswordByEmailAction: GetUserPasswordByEmailAction
  ) {}

  @ApiOperation({
    summary: 'Find user by id',
    description: 'Returns public user information by id.',
  })
  @ApiResponse({ status: 200, description: 'User returned successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  public async findById(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const params = validateDto(
        UserIdParamDto,
        request.params as object,
        'Invalid user id'
      );
      const result = await this.findUserByIdAction.execute(params.id);
      response.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  @ApiOperation({
    summary: 'Find user by email',
    description: 'Returns public user information by email.',
  })
  @ApiResponse({ status: 200, description: 'User returned successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  public async findByEmail(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const query = validateDto(
        UserEmailQueryDto,
        request.query as object,
        'Invalid email query'
      );
      const result = await this.findUserByEmailAction.execute(query.email);
      response.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  @ApiOperation({
    summary: 'Update user',
    description: 'Updates all user information, including password hash refresh.',
  })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid payload' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 409, description: 'Email or username already exists' })
  public async update(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const params = validateDto(
        UserIdParamDto,
        request.params as object,
        'Invalid user id'
      );
      if (request.user?.sub !== params.id) {
        throw new UnauthorizedError(
          'You can only update the authenticated user account'
        );
      }

      const dto = validateDto(
        UpdateUserDto,
        request.body as object,
        'Invalid user update payload'
      );

      const result = await this.updateUserAction.execute(params.id, dto);
      response.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  @ApiOperation({
    summary: 'Get user password hash by email',
    description:
      'Returns the stored password hash for operational flows. Never returns plaintext passwords.',
  })
  @ApiResponse({
    status: 200,
    description: 'Password hash returned successfully',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  public async findPasswordByEmail(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const query = validateDto(
        UserEmailQueryDto,
        request.query as object,
        'Invalid email query'
      );
      if (request.user?.email !== query.email) {
        throw new UnauthorizedError(
          'You can only retrieve password hash for your authenticated account'
        );
      }

      const result = await this.getUserPasswordByEmailAction.execute(query.email);
      response.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
