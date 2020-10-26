// Make a request using XMLHttpRequest
function xmlHttpReq() {
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  xhr.onload = function() {
    if (xhr.status < 400) {
      const dogResponse = xhr.response;
      console.log(dogResponse); // log whole api content to the console

      // append to the <ul> a <li> that contains an <img> element with the dog image
      const ulElement = document.getElementById('ul-element');
      const liElement = document.createElement('li');
      ulElement.appendChild(liElement);
      liElement.innerHTML = `<img class="img-id" src="${dogResponse.message}">`;
    } else {
      console.log(` sorry , there is an error  : ${xhr.status}`); // Error handling
    }
  };
  const url = 'https://dog.ceo/api/breeds/image/random';
  xhr.open('GET', url);
  xhr.send();
}
// xmlHttpReq();

// Make a request using Axios
function axiosReq() {
  const url = 'https://dog.ceo/api/breeds/image/random';

  axios
    .get(url)
    .then(function(dogResponse) {
      // handle success
      console.log('HTTP request with Axios');
      console.log(dogResponse);

      // append to the <ul> a <li> that contains an <img> element with the dog image
      const ulElement = document.getElementById('ul-element');
      const liElement = document.createElement('li');
      ulElement.appendChild(liElement);
      liElement.innerHTML = `<img class="img-id" src="${dogResponse.data.message}">`;
    })
    .catch(function(error) {
      // Error handling
      console.log(error);
    });
}
// axiosReq();

document.getElementById('first-btn').addEventListener('click', xmlHttpReq);
document.getElementById('second-btn').addEventListener('click', axiosReq);
