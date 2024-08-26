import { HttpException, HttpStatus } from "@nestjs/common";

export class ParkingAlreadyExistsException extends HttpException  {
    constructor() {
        super('El nombre del parking ya existe.', HttpStatus.BAD_REQUEST);
  }

}