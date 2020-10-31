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

// Fetch Data function
// In the fetchData function, make use of fetch and its Promise syntax in order to get the data from the public API
function fetchData(url) {
  return fetch(url).then(Response => Response.json());
}

// function to Add Pokemons to DOM
function addPokemonToDOM(pokemon, input) {
  pokemon.results.forEach(element => {
    const options = document.createElement('option');
    options.setAttribute('value', element.name);
    options.innerText = element.name;
    input.appendChild(options);
  });
}

// function to Add Pokemons  image tag to DOM
function addPokemonImageToDOM(image) {
  const imageTag = document.createElement('img');
  imageTag.src = image.sprites.front_default;
  document.getElementById('image-container').appendChild(imageTag);
  imageTag.style.width = '200px';
  imageTag.style.boxShadow = '0 5px black, 0px 20px gray';
}

// Main function
// The main function executes the other functions and contains all the variables
function main() {
  const containerDiv = document.createElement('div');
  document.body.appendChild(containerDiv);
  const button = document.createElement('button');
  button.innerText = 'Get Pokemon';
  containerDiv.appendChild(button);
  const selectInput = document.createElement('select');
  containerDiv.appendChild(selectInput);
  const imageContainer = document.createElement('div');
  imageContainer.setAttribute('id', 'image-container');
  containerDiv.appendChild(imageContainer);
  const url = 'https://pokeapi.co/api/v2/pokemon?limit=100&offset=5';

  // event to append all pokemons to select tag
  button.addEventListener('click', () => {
    fetchData(url).then(pokemon => {
      addPokemonToDOM(pokemon, selectInput);
    });
  });

  // event to change the image of the pokemon according to selected options
  selectInput.addEventListener('change', event => {
    imageContainer.innerHTML = '';
    fetchData(`https://pokeapi.co/api/v2/pokemon/${event.target.value}`).then(
      addPokemonImageToDOM,
    );
  });

  // styling
  containerDiv.style.width = '500px';
  containerDiv.style.display = 'flex';
  containerDiv.style.flexDirection = 'column';
  containerDiv.style.margin = 'auto';
  button.style.width = '200px';
  button.style.padding = '15px';
  button.style.fontSize = '20px';
  button.style.borderRadius = '20px';
  button.style.cursor = 'pointer';
  button.style.margin = '20px auto 20px auto';
  button.style.textAlign = 'center';
  selectInput.style.width = '150px';
  selectInput.style.height = '50px';
  selectInput.style.margin = '0 auto 30px auto';
  selectInput.style.fontSize = '20px';
  imageContainer.style.textAlign = 'center';
}

// Execute the main function when the window has finished loading
window.onload = main;
