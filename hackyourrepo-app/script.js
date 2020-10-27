'use strict';

const placeholderRepos = [
  {
    name: 'SampleRepo1',
    description: 'This repository is meant to be a sample',
    forks: 5,
    updated: '2020-05-27 12:00:00',
  },
  {
    name: 'AndAnotherOne',
    description: 'Another sample repo! Can you believe it?',
    forks: 9,
    updated: '2020-05-27 12:00:00',
  },
  {
    name: 'HYF-Is-The-Best',
    description:
      "This repository contains all things HackYourFuture. That's because HYF is amazing!!!!",
    forks: 130,
    updated: '2020-05-27 12:00:00',
  },
];

const selectRepository = document.getElementById('repositories-select');
const displayDetails = document.getElementById('repository-details');
// const contributorsName = document.getElementById('contributors-name');

// displays those repositories in an alphabetically-ordered list , snippet from Stackoverflow
placeholderRepos.sort(function sortinAlphabetically(a, b) {
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
});

// function to append the value of array into selection
function updateOptionsToSelect(arr) {
  arr.forEach(element => {
    const optionsToSelect = document.createElement('option');
    selectRepository.appendChild(optionsToSelect);
    optionsToSelect.innerText = element.name;
  });
}
updateOptionsToSelect(placeholderRepos);

// funtion to put the repository information at the repository details when it is selected from the select options
function displayDetailsOfSelectedRepository() {
  for (const element of placeholderRepos)
    if (selectRepository.value === element.name) {
      displayDetails.innerHTML = `
        <h4 class="rep-title-detail">Repository : <a href="#" class="rep-name repo-detail">${element.name}</a><h4>
        <h4 class="rep-title-detail">Description : <span class="repo-detail">${element.description}</span><h4>
        <h4 class="rep-title-detail">Forks : <span class="repo-detail">${element.forks}</span><h4>
        <h4 class="rep-title-detail">Updated : <span class="repo-detail">${element.updated}</span><h4>
      `;
    }
}
displayDetailsOfSelectedRepository();

selectRepository.addEventListener('change', displayDetailsOfSelectedRepository);
