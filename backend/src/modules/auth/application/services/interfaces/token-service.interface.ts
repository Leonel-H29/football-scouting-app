import type { JwtPayload } from '../../../domain/interfaces/jwt-payload.interface';

export interface TokenService {
  sign(payload: JwtPayload): string;
  verify(token: string): JwtPayload;
}
