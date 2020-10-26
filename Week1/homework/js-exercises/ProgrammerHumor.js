// Make a request using XMLHttpRequest
function xmlHttpReq() {
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  xhr.onload = function() {
    if (xhr.status < 400) {
      console.log('HTTP request with XMLHttpRequest');
      const comic = xhr.response;
      console.log(comic); // log whole api content to the console

      // Render the img property into an <img> tag in the DOM
      const withXML = document.getElementById('with-xml');
      withXML.innerHTML = `<h1>Image Request with XMLHttpRequest</h1>
      <img id="imgid" src="${comic.img}">`;
      const imgId = document.getElementById('imgid');

      // styling the content
      withXML.style.display = 'block';
      withXML.style.textAlign = 'Center';
      imgId.style.width = '80vw';
    } else {
      console.log(` sorry , there is an error  : ${xhr.status}`); // Error handling
    }
  };
  const url = 'https://xkcd.now.sh/?comic=latest';
  xhr.open('GET', url);
  xhr.send();
}
xmlHttpReq();

// Make a request using Axios
function axiosReq() {
  const url = 'https://xkcd.now.sh/?comic=latest';

  axios
    .get(url)
    .then(function(comicA) {
      // handle success
      console.log('HTTP request with Axios');
      console.log(comicA);

      // Render the img property into an <img> tag in the DOM
      const withAxios = document.getElementById('with-axios');
      withAxios.innerHTML = `<h1>Image Request with Axios</h1>
       <img id="imageid" src="${comicA.data.img}">`;
      const imageId = document.getElementById('imageid');

      // styling the content
      withAxios.style.display = 'block';
      withAxios.style.textAlign = 'Center';
      imageId.style.width = '60vw';
    })
    .catch(function(error) {
      // Error handling
      console.log(error);
    });
}
axiosReq();
