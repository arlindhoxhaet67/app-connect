/*
Filename: ComplexAlgorithm.js

This code demonstrates a complex algorithm for finding prime numbers.
*/

// Function to check if a number is prime
function isPrime(num) {
  if (num <= 1) return false;
  if (num === 2) return true;
  
  // Check if num is divisible by any number from 2 to sqrt(num)
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false;
    }
  }
  
  return true;
}

// Function to generate a list of prime numbers up to a given limit
function generatePrimes(limit) {
  const primes = [];
  
  // Check each number up to the limit if it's prime
  for (let num = 2; num <= limit; num++) {
    if (isPrime(num)) {
      primes.push(num);
    }
  }
  
  return primes;
}

// Main function to execute the algorithm
function main() {
  console.log("Generating prime numbers up to 1000:");
  
  const startTime = Date.now();
  const primes = generatePrimes(1000);
  const endTime = Date.now();
  
  console.log("Prime numbers found:", primes);
  console.log("Time taken:", endTime - startTime, "ms");
}

// Execute the main function
main();