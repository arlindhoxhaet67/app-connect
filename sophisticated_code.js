/* sophisticated_code.js */

// Fibonacci sequence generator
function fibonacci(n) {
  if (n < 1) {
    return [];
  } else if (n === 1) {
    return [1];
  } else if (n === 2) {
    return [1, 1];
  } else {
    let sequence = [1, 1];
    for (let i = 2; i < n; i++) {
      let sum = sequence[i - 1] + sequence[i - 2];
      sequence.push(sum);
    }
    return sequence;
  }
}

// Quicksort algorithm implementation
function quicksort(arr) {
  if (arr.length <= 1) {
    return arr;
  } else {
    let left = [];
    let right = [];
    let pivot = arr[0];
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < pivot) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }
    return [...quicksort(left), pivot, ...quicksort(right)];
  }
}

// Object-oriented programming example
class Animal {
  constructor(name, sound) {
    this.name = name;
    this.sound = sound;
  }

  makeSound() {
    console.log(`${this.name} makes ${this.sound}`);
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name, "woof");
  }

  fetch() {
    console.log(`${this.name} fetches the ball`);
  }
}

class Cat extends Animal {
  constructor(name) {
    super(name, "meow");
  }

  scratch() {
    console.log(`${this.name} scratches furniture`);
  }
}

// Example usage
const myDog = new Dog("Buddy");
myDog.makeSound();
myDog.fetch();

const myCat = new Cat("Whiskers");
myCat.makeSound();
myCat.scratch();

// Long string manipulation example
let longString = "";
for (let i = 0; i < 10000; i++) {
  longString += `Number ${i}, `;
}
console.log(longString);

// End of code