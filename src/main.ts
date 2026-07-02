import 'dotenv/config';
import { NestFactory, Reflector } from '@nestjs/core';
import {
  ValidationPipe,
  BadRequestException,
  ValidationError,
} from '@nestjs/common';
import { AppModule } from './app.module.js';
import { ResponseInterceptor } from './common/interceptors/response.interceptor.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: false });

  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(new ResponseInterceptor(reflector));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory: (errors: ValidationError[]) => {
        interface ValidationErrorField {
          property: string;
          message: string;
        }

        const formatErrors = (
          validationErrors: ValidationError[],
          parentProperty = '',
        ): ValidationErrorField[] => {
          const result: ValidationErrorField[] = [];
          for (const err of validationErrors) {
            const propertyPath = parentProperty
              ? `${parentProperty}.${err.property}`
              : err.property;
            if (err.constraints) {
              result.push({
                property: propertyPath,
                message: Object.values(err.constraints).join(', '),
              });
            }
            if (err.children && err.children.length > 0) {
              result.push(...formatErrors(err.children, propertyPath));
            }
          }
          return result;
        };

        return new BadRequestException(formatErrors(errors));
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
