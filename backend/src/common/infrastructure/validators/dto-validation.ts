import { plainToInstance } from 'class-transformer';
import { validateSync, type ValidationError as ClassValidationError } from 'class-validator';
import { ValidationError } from '../../domain/errors/validation-error';

type DtoConstructor<T extends object> = new () => T;

const collectValidationMessages = (
  errors: ReadonlyArray<ClassValidationError>,
  prefix: string = ''
): ReadonlyArray<string> => {
  const messages: string[] = [];

  for (const error of errors) {
    const propertyPath = prefix === '' ? error.property : `${prefix}.${error.property}`;

    if (error.constraints !== undefined) {
      for (const message of Object.values(error.constraints)) {
        messages.push(`${propertyPath}: ${message}`);
      }
    }

    if (error.children !== undefined && error.children.length > 0) {
      messages.push(...collectValidationMessages(error.children, propertyPath));
    }
  }

  return messages;
};

export const validateDto = <T extends object>(
  dtoClass: DtoConstructor<T>,
  payload: object,
  errorMessage: string
): T => {
  const instance = plainToInstance(dtoClass, payload, {
    enableImplicitConversion: false
  });

  const validationErrors = validateSync(instance as object, {
    whitelist: true,
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    skipMissingProperties: false,
    validationError: {
      target: false,
      value: false
    }
  });

  if (validationErrors.length > 0) {
    throw new ValidationError(errorMessage, collectValidationMessages(validationErrors));
  }

  return instance;
};
