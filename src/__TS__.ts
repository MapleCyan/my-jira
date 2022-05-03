/* eslint-disable @typescript-eslint/no-unused-vars */
type Person = {
  name: string;
  age: number;
};

// Partial的实现
type Partial<T> = {
  [P in keyof T]?: T[P];
};

// Pick的实现
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

// Exclude的实现
type Exclude<T, U> = T extends U ? never : T;

// Omit的实现
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

type AnyOne = Partial<Person>;
type PersonKeys = keyof Person; // 'name' | 'age'
type PickOne = Pick<Person, "name">;
type OmitOne = Omit<Person, "name">;

// Exclude 是操作联合类型的
type ExcludeKey = Exclude<PersonKeys, "name">;
export {};
