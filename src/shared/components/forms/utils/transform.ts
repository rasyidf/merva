import type { MetaField } from "../form-builder.types";

type TransformConfig = {
  input?: (value: any) => any;
  output?: (value: any) => any;
};

export type FieldTransforms = Record<string, TransformConfig>;

export const createFieldTransformer = (
  fields: MetaField[],
  transforms: FieldTransforms
) => {
  const transformInput = (data: Record<string, any>) => {
    return Object.entries(data).reduce((acc, [key, value]) => {
      const transform = transforms[key]?.input;
      acc[key] = transform ? transform(value) : value;
      return acc;
    }, {} as Record<string, any>);
  };

  const transformOutput = (data: Record<string, any>) => {
    return Object.entries(data).reduce((acc, [key, value]) => {
      const transform = transforms[key]?.output;
      acc[key] = transform ? transform(value) : value;
      return acc;
    }, {} as Record<string, any>);
  };

  const getFieldTransform = (fieldName: string) => transforms[fieldName];

  return {
    transformInput,
    transformOutput,
    getFieldTransform,
  };
};