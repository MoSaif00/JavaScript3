// Write a function called checkDoubleDigits that:
// Takes 1 argument: a number
// Returns a new Promise
// If the number is bigger than 10, resolve with the string: "The number is bigger than 10!"
// If the number is smaller than 10, reject with the error: "Error! The number is smaller than 10..."

'use strict';

function checkDoubleDigits(num) {
  // Returns a new Promise
  return new Promise((resolve, reject) => {
    if (num >= 10) {
      if (num > 10) {
        // If the number is bigger than 10, resolve with the string: "The number is bigger than 10!"
        resolve(`The number ${num} is bigger than 10!`);
      } else {
        resolve('The number is Equal to 10!');
      }
    } else {
      // If the number is smaller than 10, reject with the error: "Error! The number is smaller than 10..."
      reject(new Error('Error! The number is smaller than 10...'));
    }
  });
}

checkDoubleDigits(15)
  .then(response => console.log(response))
  .catch(error => console.log(error.message));
// checkDoubleDigits(5)
// .then(response => console.log(response))
// .catch(error => console.log(error.message));
