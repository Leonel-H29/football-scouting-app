import 'reflect-metadata';

const SWAGGER_TAGS_KEY = 'swagger:tags';
const SWAGGER_OPERATION_KEY = 'swagger:operation';
const SWAGGER_RESPONSES_KEY = 'swagger:responses';
const SWAGGER_PROPERTY_KEY = 'swagger:property';

export const ApiTags = (...tags: ReadonlyArray<string>): ClassDecorator => {
  return (target) => {
    Reflect.defineMetadata(SWAGGER_TAGS_KEY, [...tags], target);
  };
};

export const ApiOperation = (options: { readonly summary: string; readonly description?: string }): MethodDecorator => {
  return (target, propertyKey, _descriptor) => {
    Reflect.defineMetadata(SWAGGER_OPERATION_KEY, options, target, propertyKey);
  };
};

export const ApiResponse = (options: { readonly status: number; readonly description: string }): MethodDecorator => {
  return (target, propertyKey, _descriptor) => {
    const existingResponses = Reflect.getMetadata(SWAGGER_RESPONSES_KEY, target, propertyKey) as ReadonlyArray<{ readonly status: number; readonly description: string }> | undefined;
    const nextResponses = existingResponses === undefined ? [options] : [...existingResponses, options];
    Reflect.defineMetadata(SWAGGER_RESPONSES_KEY, nextResponses, target, propertyKey);
  };
};

export const ApiProperty = (options: { readonly description?: string; readonly example?: string | number | boolean | ReadonlyArray<string | number | boolean>; readonly required?: boolean; readonly enum?: ReadonlyArray<string> }): PropertyDecorator => {
  return (target, propertyKey) => {
    Reflect.defineMetadata(SWAGGER_PROPERTY_KEY, { ...options, required: true }, target, propertyKey);
  };
};

export const ApiPropertyOptional = (options: { readonly description?: string; readonly example?: string | number | boolean | ReadonlyArray<string | number | boolean>; readonly enum?: ReadonlyArray<string> } = {}): PropertyDecorator => {
  return (target, propertyKey) => {
    Reflect.defineMetadata(SWAGGER_PROPERTY_KEY, { ...options, required: false }, target, propertyKey);
  };
};
