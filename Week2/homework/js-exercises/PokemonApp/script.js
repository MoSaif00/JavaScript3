'use strict';
/*
- Create and append DOM elements using JavaScript only
- Fetch data twice from a public API PokeAPI
- Display the results in the DOM.

= Here are the requirements:
    Create 3 functions: fetchData, addPokemonToDOM and main
    The main function executes the other functions and contains all the variables
    In the fetchData function, make use of fetch and its Promise syntax in order to get the data from the public API
    Execute the main function when the window has finished loading
*/

// const url ='https://pokeapi.co/api/v2/pokemon?limit=100&offset=10';

// Fetch Data function
// In the fetchData function, make use of fetch and its Promise syntax in order to get the data from the public API
function fetchData(url) {
  fetch(url).then(Response => Response.json());
}
// Add Pokemon to DOM function
function addPokemonToDOM() {}
// Main function
// The main function executes the other functions and contains all the variables
function main() {}
