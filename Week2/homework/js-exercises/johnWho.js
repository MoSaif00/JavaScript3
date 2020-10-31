// const getAnonName = (firstName, callback) => {
//   setTimeout(() => {
//     if (!firstName)
//       return callback(new Error("You didn't pass in a first name!"));

//     const fullName = `${firstName} Doe`;

//     return callback(fullName);
//   }, 2000);
// };

// getAnonName('John', console.log);

// Rewrite this function, but replace the callback syntax with the Promise syntax:
// Have the getAnonName function return a new Promise that uses the firstName parameter
// If the Promise resolves, pass the full name as an argument to resolve with
// If the Promise rejects, pass an error as the argument to reject with: "You didn't pass in a first name!"

function getAnonName(firstName) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!firstName) {
        reject(new Error("You didn't pass in a first name!"));
      }
      const fullName = `${firstName} Doe`;
      resolve(fullName);
    }, 2000);
  });
}
getAnonName('John')
  .then(console.log)
  .catch(console.log);
// getAnonName()
//   .then(console.log)
//   .catch(console.log);
