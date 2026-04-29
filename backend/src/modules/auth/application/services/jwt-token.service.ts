import jwt, { type JwtPayload as JwtLibPayload } from 'jsonwebtoken';
import { UnauthorizedError } from '../../../../common/domain/errors/unauthorized-error';
import { config } from '../../../../config/config';
import type { JwtPayload } from '../../domain/interfaces/jwt-payload.interface';
import type { TokenService } from '../services/interfaces/token-service.interface';
import type { SignOptions } from 'jsonwebtoken';

const isObjectPayload = (
  payload: string | JwtLibPayload
): payload is JwtLibPayload => {
  return typeof payload !== 'string';
};

export class JwtTokenService implements TokenService {
  sign(payload: JwtPayload): string {
    return jwt.sign(payload, config.jwtSecret, {
      expiresIn: config.jwtExpiresIn,
    });
  }

  verify(token: string): JwtPayload {
    const decoded = jwt.verify(token, config.jwtSecret);

    if (!isObjectPayload(decoded)) {
      throw new UnauthorizedError('Invalid token');
    }

    const sub = decoded.sub;
    const email = decoded.email;
    const username = decoded.username;

    if (
      typeof sub !== 'string' ||
      typeof email !== 'string' ||
      typeof username !== 'string'
    ) {
      throw new UnauthorizedError('Invalid token payload');
    }

    return { sub, email, username };
  }
}
