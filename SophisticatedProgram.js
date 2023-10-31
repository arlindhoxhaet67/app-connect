/*
 * Filename: SophisticatedProgram.js
 * Description: This program demonstrates a complex and sophisticated implementation 
 *              of a sorting algorithm known as "Merge Sort". It efficiently sorts 
 *              an array of numbers by dividing it recursively into smaller sub-arrays, 
 *              sorting them, and then merging them back together.
 */

function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);

  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  let resultArray = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      resultArray.push(left[leftIndex]);
      leftIndex++;
    } else {
      resultArray.push(right[rightIndex]);
      rightIndex++;
    }
  }

  return resultArray
    .concat(left.slice(leftIndex))
    .concat(right.slice(rightIndex));
}

const unsortedArray = [9, 2, 5, 1, 8, 4, 7, 3, 6];
console.log("Unsorted Array: ", unsortedArray);

const sortedArray = mergeSort(unsortedArray);
console.log("Sorted Array: ", sortedArray);


/* Output:
Unsorted Array:  [9, 2, 5, 1, 8, 4, 7, 3, 6]
Sorted Array:  [1, 2, 3, 4, 5, 6, 7, 8, 9]
*/