import { HttpException, HttpStatus } from '@nestjs/common';

export class UnauthorizedException extends HttpException {
  constructor() {
    super(
      'You are not authorized to access this resource.',
      HttpStatus.UNAUTHORIZED,
    );
  }
}
