'use strict';

function main() {
  document.body.innerHTML = `
  <div class="container">
    <section class="header" id="header">
      <h1>HackYourFuture Repositories</h1>

      <select name="repositories" id="repositories-select">
        <option selected disabled> SELECT REPOSITORY </option>

      </select>

    </section>

    <div class="error-message" id="error-message">
     Network Request Failed 
    </div>

    <section class="page-contents">
      <div id="repository-details">
      </div>

      <div class="contributors-container">
        <div class="contributors-title">
          <h3>Contributors</h3>
        </div>
        <div id="contributors-members">
        
        </div>
        <div id="paginationNumber" class="pagination"></div>
      </div>
    </section>

  </div>

  <section class="footer">
    <h1>HackYourFuture Repositories</h1>
  </section>
  `;
  const errorDiv = document.getElementById('error-message');
  const selectRepository = document.getElementById('repositories-select');
  const repositoryDetailsDiv = document.getElementById('repository-details');
  const contributorMembersDiv = document.getElementById('contributors-members');

  let currentPage = 1;
  let rows = 5;
  // function displays those repositories in an alphabetically-ordered list , snippet from Stackoverflow
  function sortAlphabetically(data) {
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

  function paginateThePage(arr) {
    const wrapper = document.getElementById('paginationNumber');

    const pageCount = Math.ceil(arr.length / rows);

    const setPagination = (items, container, rowPerPage) => {
      container.innerHTML = ''; // maybe no need
      for (let i = 1; i < pageCount + 1; i++) {
        const pagebutton = paginateButton(i, items);
        container.appendChild(pagebutton);
      }
    };
    const paginateButton = (page, contributors) => {
      const button = document.createElement('button');
      button.classList = 'btn-page';
      button.innerText = page;
      if (currentPage === page) {
        button.classList = 'btn-page btn-page-active';
        document.querySelector('.pagination').style.display = 'flex';
      }
      if (pageCount === 1) {
        button.style.display = 'none';
        document.querySelector('.pagination').style.display = 'none';
      }
      button.addEventListener('click', () => {
        currentPage = page;
        displayContributors(
          contributors,
          contributorMembersDiv,
          rows,
          currentPage
        );
        const currentNum = document.querySelector(
          '.pagination .btn-page-active'
        );
        currentNum.classList.remove('btn-page-active');
        button.classList.add('btn-page-active');
      });
      return button;
    };
    displayContributors(arr, contributorMembersDiv, rows, currentPage);
    setPagination(arr, wrapper, rows);
  }
  // function to get the data from API  and place it on the select and repository div
  function fetchTheDataOfRepositories() {
    const url = 'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
    fetch(url)
      .then((response) => {
        if (response.status < 400) {
          const data = response.json();
          return data;
        } else {
          errorDiv.style.display = 'block';
        }
      })
      .then((data) => {
        updateRepositoriesToSelect(data);
      })
      .catch(() => (errorDiv.style.display = 'block'));
  }

  function updateRepositoriesToSelect(repositoryData) {
    sortAlphabetically(repositoryData);

    repositoryData.forEach((element) => {
      const optionsToSelect = document.createElement('option');
      optionsToSelect.setAttribute('value', element.name);
      optionsToSelect.innerText = element.name;
      selectRepository.appendChild(optionsToSelect);

      selectRepository.addEventListener('change', (e) => {
        if (e.target.value === optionsToSelect.value) {
          fetchContributors(element);

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
            ' '
          )}</span>
        </h4>
          `;
        }
      });
    });
  }
  // function displayContributors(contributors, container, rowPerPage, page) {
  //   container.innerHTML = '';

  //   contributors.forEach((member) => {
  //     const contributorBoxDiv = document.createElement('div');
  //     contributorBoxDiv.setAttribute('class', 'contributor-box');
  //     const contributorImage = document.createElement('img');
  //     contributorImage.src = member.avatar_url;
  //     const contributorName = document.createElement('a');
  //     contributorName.setAttribute('href', '${member.html_url}');
  //     contributorName.innerText = member.login;
  //     const badge = document.createElement('h5');
  //     badge.setAttribute('class', 'badge');
  //     badge.innerText = member.contributions;
  //     contributorMembersDiv.appendChild(contributorBoxDiv);
  //     contributorBoxDiv.appendChild(contributorImage);
  //     contributorBoxDiv.appendChild(contributorName);
  //     contributorBoxDiv.appendChild(badge);
  //   });
  // }
  function displayContributors(contributors, container, rowPerPage, page) {
    container.innerHTML = '';
    page--;
    let start = rowPerPage * page;
    let end = start + rowPerPage;
    let paginatedItems = contributors.slice(start, end);

    for (let i = 0; i < paginatedItems.length; i++) {
      let member = paginatedItems[i];
      const contributorBoxDiv = document.createElement('div');
      contributorBoxDiv.setAttribute('class', 'contributor-box');
      const contributorImage = document.createElement('img');
      contributorImage.src = member.avatar_url;
      const contributorName = document.createElement('a');
      contributorName.setAttribute('href', '${member.html_url}');
      contributorName.innerText = member.login;
      const badge = document.createElement('h5');
      badge.setAttribute('class', 'badge');
      badge.innerText = member.contributions;
      contributorMembersDiv.appendChild(contributorBoxDiv);
      contributorBoxDiv.appendChild(contributorImage);
      contributorBoxDiv.appendChild(contributorName);
      contributorBoxDiv.appendChild(badge);
    }
  }
  async function fetchContributors(element) {
    try {
      const contributorUrl = `https://api.github.com/repos/HackYourFuture/${element.name}/contributors`;
      const fetchContributors = await fetch(contributorUrl);
      if (fetchContributors.status < 400) {
        const response = await fetchContributors.json();
        return paginateThePage(response);
      } else {
        errorDiv.style.display = 'block';
      }
    } catch {
      errorDiv.style.display = 'block';
    }
    // const contributorUrl = `https://api.github.com/repos/HackYourFuture/${element.name}/contributors`;
    // fetch(contributorUrl)
    //   .then((response) => {
    //     const data = response.json();
    //     return data;
    //   })
    //   .then((data) => {
    //     paginateThePage(data);
    //   })
    //   .catch((error) => (errorDiv.style.display = 'block'));
  }
  fetchTheDataOfRepositories();
}

window.addEventListener('load', main);
