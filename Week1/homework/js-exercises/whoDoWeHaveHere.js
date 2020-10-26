// Make a request using XMLHttpRequest
function xmlHttpReq() {
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  xhr.onload = function() {
    if (xhr.status < 400) {
      console.log('HTTP request with XMLHttpRequest');
      const users = xhr.response;
      console.log(
        `Random User Name : ${users.results[0].name.title} ${users.results[0].name.first} ${users.results[0].name.last}`,
      ); // log only the full name from the api.
      console.log(users); // log whole api content
    } else {
      console.log(` sorry , there is an error  : ${xhr.status}`); // Error handling
    }
  };
  const url = 'https://www.randomuser.me/api';
  xhr.open('GET', url);
  xhr.send();
}
xmlHttpReq();

// Make a request using Axios
function axiosReq() {
  const url = 'https://www.randomuser.me/api';

  axios
    .get(url)
    .then(function(response) {
      // handle success
      console.log('HTTP request with Axios');
      console.log(
        `Random User Name : ${response.data.results[0].name.title} ${response.data.results[0].name.first} ${response.data.results[0].name.last}`,
      );
      console.log(response);
    })
    .catch(function(error) {
      // Error handling
      console.log(error);
    });
}
axiosReq();
