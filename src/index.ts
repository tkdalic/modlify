export type Schema = (target: any) => any;
export type varSchema = Schema | Schema[];

function flatten<T>(target: (T | T[])[]): T[] {
  return target.reduce(
    (result: T[], element: T | T[]): T[] => result.concat(element),
    []
  );
}

export function convert(target: unknown, ...schema: varSchema[]): unknown {
  const flatSchema = flatten(schema);

  if (flatSchema.length === 0) {
    return target;
  }

  return flatSchema.reduce(
    (value: any, converter: Schema): any => converter(value),
    target
  );
}

export function object(schema: { [key: string]: varSchema }): varSchema {
  return (target: any): any => {
    const result: any = {};
    Object.keys(schema).forEach(
      key => (result[key] = convert(target[key], schema[key]))
    );
    return result;
  };
}

export function array(schema: varSchema): varSchema {
  return (targets: any): any =>
    targets.map((target: any) => convert(target, schema));
}
