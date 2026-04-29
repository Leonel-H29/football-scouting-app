import { type NextFunction, type Request, type Response } from 'express';
import { validateDto } from '../../../../common/infrastructure/validators/dto-validation';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '../../../../common/infrastructure/swagger/swagger.decorators';
import { LoginAction } from '../../application/actions/login.action';
import { RegisterAction } from '../../application/actions/register.action';
import { LoginDto } from '../../domain/dto/login.dto';
import { RegisterDto } from '../../domain/dto/register.dto';

@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly registerAction: RegisterAction,
    private readonly loginAction: LoginAction
  ) {}

  @ApiOperation({
    summary: 'Register user',
    description: 'Registers a new user account.',
  })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully',
  })
  public async register(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const dto = validateDto(
        RegisterDto,
        request.body as object,
        'Invalid register payload'
      );
      const result = await this.registerAction.execute(dto);
      response.status(201).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  @ApiOperation({
    summary: 'Login user',
    description: 'Authenticates user and returns JWT token.',
  })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
  })
  public async login(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const dto = validateDto(
        LoginDto,
        request.body as object,
        'Invalid login payload'
      );
      const result = await this.loginAction.execute(dto);
      response.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
