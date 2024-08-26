import { ExceptionFilter, Catch, HttpException, ArgumentsHost } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    // Obtener el nombre de la excepción y el mensaje
    const exceptionName = exception.constructor.name;
    const message = typeof exceptionResponse === 'string'
      ? exceptionResponse
      : (exceptionResponse as any).message;

    response.status(status).json({
      exception: exceptionName, // Incluir el nombre de la excepción
      message: message,
    });
  }
}

