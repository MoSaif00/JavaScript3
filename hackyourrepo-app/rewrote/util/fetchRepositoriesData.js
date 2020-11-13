export async function fetchRepositoryData() {
  const errorDiv = document.getElementById('error-message');

  try {
    const url = 'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
    const data = await fetch(url);
    if (data.status < 400) {
      const response = await data.json();
      return response;
    }
    return data;
    errorDiv.style.display = 'block';
  } catch (err) {
    errorDiv.style.display = 'block';
    return err;
  }
}
