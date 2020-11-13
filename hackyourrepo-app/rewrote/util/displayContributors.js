export function displayContributors(contributors, container, rowPerPage, page) {
  const contributorMembersDiv = document.getElementById('contributors-members');

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
    // eslint-disable-next-line no-template-curly-in-string
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
