# TypeScript

## why

1.  减少低级错误，比如拼写，在编译时就能帮你找到大部分潜在问题
2.  减少不必要的判断，比如一个函数需要接收一些固定类型的参数，不需要内部判断了
3.  IDE增强
4.  代码可阅读性、维护性增强

## 快速上手

1.  `tsc` 编译 & `tsconfig.json`
2.  类型注解、接口声明、头文件等
3.  模块化
4.  配合模块打包器

## 入门

### 类型注解

```ts
const str: string = 123 // error
```

### 基础类型

ts 提供的类型基本和 js 一致，主要提供了 `boolean string number Array tuple(元组) enum void null undefined any never object`

```ts
const isProd: boolean = false
const str: string = '123'
const num: number = 123
```

> boolean 不可赋值为 new Boolean() 的返回

**数组**

```ts
const list: number[] = [1] // 在元素类型后面接上 []
const list2: Array<number> = [1] // 数组泛型，Array<元素类型>
```

**Tuple(元组)**

元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同.
当访问一个已知索引的元素，会得到正确的类型.
当访问一个越界的元素，会使用联合类型替代

```ts
const list: [number, string] = [123, '123']
list[1].slice() // ok
list[0].slice() // error
list[2] = 233 // ok (number | string)
list[2] = true // error
```

**枚举**

> 枚举默认从 0 开始，也可以定义值，如果是数字，一样，会从该项开始计算，但只会影响之后的

```ts
enum Color {Red, Green = 2, Yellow} // [0, 2, 3]

const red: Color.Red = 0 // 只能赋值 0/Color.Red但不能赋值其他枚举值为 0 的值
```

**any&void&null&undefined&never**

1.  null & undefined 是任何类型的 子类
2.  void 表示空值，但不是其他类型基本类型子类
3.  any 为任意类型，最为宽松
4.  never 类型表示的是那些永不存在的值的类型，也是任何类型子类，可以赋值给任何类型，但是除了自己不能被赋值

> null undefined 类型，可以赋值给任意类型包括互换，除了 never。never 可以赋值给任意类型，其含义就是不允许赋值

```ts
let a: undefined
let b: null
let c: never
let d: void = c // ok
let e: any = a // ok
c = a // error
```

**object**

object表示非原始类型，也就是除number，string，boolean，symbol，null或undefined之外的类型。

```ts
declare function create(o: object | null): void;

create({}) // ok
create(null) // ok
create(0) // error
```

### 接口

**定义接口**

> 不能多不能少，除非可选和可额外

```ts
enum Six {man, woman}
interface People {
  height: number;
  readonly six: Six;
  weight?: number;
  [propName: string]: any;
}
```

**函数接口**

> js 中函数两种方式定义，函数声明&函数表达式。函数接口用于函数函数声明

```js
interface Add {
  (num1: number, num2: number): number
}
const add: Add = function (num1, num2) {
  return num1 + num2
}

function AddFactory(add: Add): Add {
  return (num1, num2) => add(num1 + 1, num2 + 1)
}
AddFactory((num1, num2) => num1 + num2)(1, 2) // ok
AddFactory((num1, num2) => num1 + num2)(1, '2') // error
```

**可索引接口**

### 函数&类

### 类型断言&范型&类型推论&联合类型

### 其他内置类型

### 声明文件


## 集成

### ide

### lint

### 模块打包器

#### webpack
#### rollup
