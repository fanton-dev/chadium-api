import { HttpException, HttpStatus } from '@nestjs/common';

export class NoSuchUserException extends HttpException {
  constructor() {
    super('No such user exists.', HttpStatus.NOT_FOUND);
  }
}
