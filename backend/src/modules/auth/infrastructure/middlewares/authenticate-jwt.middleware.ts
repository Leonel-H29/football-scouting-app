import type { RequestHandler } from 'express';
import { UnauthorizedError } from '../../../../common/domain/errors/unauthorized-error';
import type { TokenService } from '../../application/services/interfaces/token-service.interface';

const extractBearerToken = (authorizationHeader: string): string => {
  const [scheme, token] = authorizationHeader.split(' ');

  if (scheme !== 'Bearer' || token === undefined || token.length === 0) {
    throw new UnauthorizedError('Authorization header must be Bearer token');
  }

  return token;
};

export const authenticateJwtMiddleware = (
  tokenService: TokenService
): RequestHandler => {
  return (request, _response, next) => {
    try {
      const authorizationHeader = request.headers.authorization;
      if (authorizationHeader === undefined) {
        throw new UnauthorizedError('Missing authorization header');
      }

      const token = extractBearerToken(authorizationHeader);
      request.user = tokenService.verify(token);
      next();
    } catch (error) {
      next(error);
    }
  };
};
