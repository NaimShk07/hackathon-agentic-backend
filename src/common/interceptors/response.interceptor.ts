import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RESPONSE_MESSAGE_KEY } from '../decorators/response-message.decorator.js';

export interface ResponseWrapper<T> {
  statusCode: number;
  message: string;
  data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<
  T,
  ResponseWrapper<T>
> {
  constructor(private readonly reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<ResponseWrapper<T>> {
    const handler = context.getHandler();
    const controller = context.getClass();

    const message =
      this.reflector.getAllAndOverride<string>(RESPONSE_MESSAGE_KEY, [
        handler,
        controller,
      ]) ?? 'Success';

    const httpContext = context.switchToHttp();
    const response = httpContext.getResponse<Response>();
    const statusCode = response.statusCode;

    return next.handle().pipe(
      map((data: unknown) => ({
        statusCode,
        message,
        data: (data ?? null) as T,
      })),
    );
  }
}
