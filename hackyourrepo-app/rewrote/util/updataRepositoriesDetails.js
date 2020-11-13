export function repositoryDetails(elements, repoValue) {
  const repositoryDetailsDiv = document.getElementById('repository-details');

  const element = elements.find(el => el.name === repoValue);
  repositoryDetailsDiv.innerHTML = `
          <h4 class="rep-title-detail">
          Repository : 
          <a href="${element.html_url}" class="rep-name repo-detail">${
    element.name
  }</a>
        </h4>
        <h4 class="rep-title-detail">
          Description : 
          <span class="repo-detail">${
            element.description == null
              ? (element.description = 'No description available')
              : element.description
          }</span>
        </h4>
        <h4 class="rep-title-detail">
          Forks :
          <span class="repo-detail">${element.forks}</span>
        </h4>
        <h4 class="rep-title-detail">
          Updated :
          <span class="repo-detail">${element.updated_at.replace(
            /[A-Z]/g,
            ' ',
          )}</span>
        </h4>
          `;
  return element;
}
