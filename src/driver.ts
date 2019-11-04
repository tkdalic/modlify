import { convert, object, array } from "./index";

// TODO: テストを書いて削除する

console.log("20", 20);
console.log(convert("20", (target: string) => Number(target)));

const person = {
  name: "test",
  age: "20"
};

console.log(
  convert(
    person,
    object({
      name: (target: string): string => target + "さん",
      age: (target: string): number => Number(target)
    })
  )
);

const persons = [
  {
    name: "hoge",
    age: 15
  },
  {
    name: "fuga",
    age: 21
  }
];

console.log(
  convert(
    persons,
    array(
      object({
        name: [
          (target: string): string => target + "さん",
          (target: string): string => target + "さん"
        ],
        age: (target: string): number => Number(target)
      })
    )
  )
);
