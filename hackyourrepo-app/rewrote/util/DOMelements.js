export function elementsDOM() {
  return (document.body.innerHTML = `
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
    `);
}
