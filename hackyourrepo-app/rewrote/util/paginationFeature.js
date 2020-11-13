import { displayContributors } from './displayContributors.js';

export function paginateThePage(arr) {
  let currentPage = 1;
  const rows = 5;
  const contributorMembersDiv = document.getElementById('contributors-members');
  const wrapper = document.getElementById('paginationNumber');

  const pageCount = Math.ceil(arr.length / rows);
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
        currentPage,
      );
      const currentNum = document.querySelector('.pagination .btn-page-active');
      currentNum.classList.remove('btn-page-active');
      button.classList.add('btn-page-active');
    });
    return button;
  };
  const setPagination = (items, container, rowPerPage) => {
    container.innerHTML = ''; // maybe no need
    for (let i = 1; i < pageCount + 1; i++) {
      const pagebutton = paginateButton(i, items);
      container.appendChild(pagebutton);
    }
  };

  displayContributors(arr, contributorMembersDiv, rows, currentPage);
  setPagination(arr, wrapper, rows);
}
