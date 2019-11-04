# moldify

moldify is transforming object with schema library.

## How to use

```typescript
import moldify

const person = {
    name: "test",
    age: "20"
};

schema = moldify.object({
    name: (target: string): string => target + "さん",
    age: (target: string): number => Number(target),
});

moldify.convert(person, schema)
// outputs:
// {
//     name: "testさん",
//     age: 20
// }
```
