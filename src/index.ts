export type Schema<T, K> = (target: T) => K;

export function convert<T, K>(
  target: T,
  ...schema: Schema<T, K>[] | Schema<T, K>[][]
): T | K {
  const flatSchema: Schema<T, K>[] = (schema as Schema<T, K>[][]).reduce(
    (result: any, element: any): Schema<T, K>[] => result.concat(element),
    []
  );

  if (flatSchema.length === 0) {
    return target;
  }

  return flatSchema.reduce(
    (value: any, converter: any) => converter(value),
    target
  );
}

export function object(schema: any): any {
  return (target: any) => {
    const result: any = {};
    Object.keys(schema).forEach(
      key => (result[key] = convert(target[key], schema[key]))
    );
    return result;
  };
}

export function array(schema: any): any {
  return (targets: any) =>
    targets.map((target: any) => convert(target, schema));
}
