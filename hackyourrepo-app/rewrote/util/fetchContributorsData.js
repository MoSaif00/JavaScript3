import { paginateThePage } from './paginationFeature.js';

export async function fetchContributors(element) {
  const errorDiv = document.getElementById('error-message');

  try {
    const contributorUrl = `https://api.github.com/repos/HackYourFuture/${element.name}/contributors`;
    const response = await fetch(contributorUrl);
    if (response.status < 400) {
      const data = await response.json();
      return paginateThePage(data);
    }
    errorDiv.style.display = 'block';
  } catch (err) {
    errorDiv.style.display = 'block';
    return err;
  }
}
