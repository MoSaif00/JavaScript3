'use strict';

function main() {
  // create and append the header section to the body
  const bodyContainer = document.createElement('div');
  bodyContainer.setAttribute('class', 'container');
  const headerSection = document.createElement('section');
  headerSection.setAttribute('class', 'header');
  headerSection.setAttribute('id', 'header');
  const headingHeaderText = document.createElement('h1');
  headingHeaderText.innerText = 'HackYourFutrue Repositories';
  const selectTag = document.createElement('select');
  selectTag.setAttribute('name', 'repositories');
  selectTag.setAttribute('id', 'repositories-select');
  document.body.appendChild(bodyContainer);
  bodyContainer.appendChild(headerSection);
  headerSection.appendChild(headingHeaderText);
  headerSection.appendChild(selectTag);

  // create and append the the Error message to the body container
  const errorDiv = document.createElement('div');
  errorDiv.setAttribute('class', 'error-message');
  errorDiv.setAttribute('id', 'error-message');
  errorDiv.innerText = 'Network Request Faild';
  bodyContainer.appendChild(errorDiv);

  // create and apped the reoistory section and the contributors sections to the body container
  const contentSection = document.createElement('section');
  contentSection.setAttribute('class', 'page-contents');
  const repoInfoDivTag = document.createElement('div');
  repoInfoDivTag.setAttribute('id', 'repository-details');
  const contributorDivTag = document.createElement('div');
  contributorDivTag.setAttribute('class', 'contributors-container');
  const contributeTitleTag = document.createElement('div');
  contributeTitleTag.setAttribute('class', 'contributors-title');
  const contributHeadingText = document.createElement('h3');
  contributHeadingText.innerText = 'contributors';
  const contributersMembersDiv = document.createElement('div');
  contributersMembersDiv.setAttribute('id', 'contributors-members');
  bodyContainer.appendChild(contentSection);
  contentSection.appendChild(repoInfoDivTag);
  contentSection.appendChild(contributorDivTag);
  contributorDivTag.appendChild(contributeTitleTag);
  contributeTitleTag.appendChild(contributHeadingText);
  contributorDivTag.appendChild(contributersMembersDiv);

  // // pagination DOM
  // const paginationDiv = document.createElement('div');
  // paginationDiv.setAttribute('class', 'pagenumbers');
  // paginationDiv.setAttribute('id', 'pagination');
  // contributorDivTag.appendChild(paginationDiv);

  // create and append the footer of the page
  const footerSection = document.createElement('section');
  footerSection.setAttribute('class', 'footer');
  const footerText = document.createElement('h1');
  footerText.innerText = 'HackYourFutrue Repositories';
  document.body.appendChild(footerSection);
  footerSection.appendChild(footerText);

  const selectRepository = document.getElementById('repositories-select');
  const displayDetails = document.getElementById('repository-details');
  const url = 'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';

  // function returns fetch parsed API data,
  // eslint-disable-next-line no-shadow
  async function fetchData(url) {
    const Response = await fetch(url);
    const data = await Response.json();
    return data;
  }

  // function displays those repositories in an alphabetically-ordered list , snippet from Stackoverflow
  function sortinAlphabetically(data) {
    data.sort(function compare(a, b) {
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
  }
  // function to append the value of the fetched data into select menue
  function updateOptionsToSelect(arr, input) {
    arr.forEach(element => {
      const optionsToSelect = document.createElement('option');
      optionsToSelect.setAttribute('value', element.name);
      optionsToSelect.innerText = element.name;
      input.appendChild(optionsToSelect);
    });
  }

  // functio to fetch the data from the contributors url and return to the contributors section
  function displayContributors(arr) {
    fetchData(arr.contributors_url).then(data => {
      data.forEach(member => {
        const contributerBoxDiv = document.createElement('div');
        contributerBoxDiv.setAttribute('class', 'contributor-box');
        const contributerImage = document.createElement('img');
        contributerImage.src = member.avatar_url;
        const contributerName = document.createElement('a');
        // eslint-disable-next-line no-template-curly-in-string
        contributerName.setAttribute('href', '${member.html_url}');
        contributerName.innerText = member.login;
        const badge = document.createElement('h5');
        badge.setAttribute('class', 'badge');
        badge.innerText = member.contributions;
        contributersMembersDiv.appendChild(contributerBoxDiv);
        contributerBoxDiv.appendChild(contributerImage);
        contributerBoxDiv.appendChild(contributerName);
        contributerBoxDiv.appendChild(badge);
      });
    });
  }

  // funtion to put the repository information at the repository details when it is selected from the select options
  function displayDetailsOfSelectedRepository(arr) {
    contributersMembersDiv.innerHTML = '';
    arr.forEach(element => {
      if (selectRepository.value === element.name) {
        displayDetails.innerHTML = `

      <h4 class="rep-title-detail">Repository : <a href="#" class="rep-name repo-detail">${
        element.name
      }</a><h4>
      <h4 class="rep-title-detail">Description : <span class="repo-detail">${
        element.description == null
          ? (element.description = 'No description available')
          : element.description
      }</span><h4>
      <h4 class="rep-title-detail">Forks : <span class="repo-detail">${
        element.forks
      }</span><h4>
      <h4 class="rep-title-detail">Updated : <span class="repo-detail">${element.updated_at.replace(
        /[A-Z]/g,
        ' ',
      )}</span><h4>
    `;
        displayContributors(element);
      }
    });
  }

  // fetch Api
  fetchData(url)
    .then(data => {
      sortinAlphabetically(data);
      updateOptionsToSelect(data, selectRepository);
      displayDetailsOfSelectedRepository(data);
      selectRepository.addEventListener('change', () => {
        fetchData(url).then(displayDetailsOfSelectedRepository);
      });
    })
    .catch(() => {
      errorDiv.style.display = 'block';
    });
}
window.onload = main;
