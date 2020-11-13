'use strict';

import { elementsDOM } from './util/DOMelements.js';
import { updateRepositoriesToSelect } from './util/updateOptionList.js';
import { fetchContributors } from './util/fetchContributorsData.js';
import { repositoryDetails } from './util/updataRepositoriesDetails.js';
import { fetchRepositoryData } from './util/fetchRepositoriesData.js';

async function main() {
  const errorDiv = document.getElementById('error-message');

  try {
    elementsDOM();
    const selectRepository = document.getElementById('repositories-select');
    const fetchedRepositories = await fetchRepositoryData();
    const optionsRepo = updateRepositoriesToSelect(fetchedRepositories);

    selectRepository.addEventListener('change', async e => {
      const repoDetails = await repositoryDetails(optionsRepo, e.target.value);
      await fetchContributors(repoDetails);
    });
  } catch (error) {
    errorDiv.style.direction = 'block';
    return error;
  }
}
window.addEventListener('load', main);
