import { sortAlphabetically } from './sortAlphabetically.js';

export function updateRepositoriesToSelect(repositoryData) {
  const selectRepository = document.getElementById('repositories-select');
  sortAlphabetically(repositoryData);

  repositoryData.forEach(element => {
    const optionsToSelect = document.createElement('option');
    optionsToSelect.setAttribute('value', element.name);
    optionsToSelect.innerText = element.name;
    selectRepository.appendChild(optionsToSelect);
    return element;
  });
  return repositoryData;
}
