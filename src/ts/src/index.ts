// 基本类型

enum Color {Red, Green, Yellow}

const color: Color = Color.Red

enum Color2 {Red, Green = 2, Yellow}

const color2: Color2 = Color2.Yellow

let color3: Color2.Green
color3 = 2

const a: undefined = undefined
const Null: null = a
const V: void = a
const a2: undefined = null
let ne: never
const an: undefined = ne

enum Six {man, woman}
interface People {
  height: number;
  six: Six;
}

const people: People = {
  height: 175,
  six: 0
}

interface Add {
  (num1: number, num2: number): number
}
const add: Add = function add (num1, num2) {
  return num1 + num2
}

function AddFactory(add: Add): Add {
  return (num1, num2) => add(num1 + 1, num2 + 1)
}

AddFactory(add)(1, 2)
AddFactory((num1, num2) => num1 + num2)(1, 2)
