function ajax(method, url) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response);
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText
      });
    };
    xhr.send();
  });
}

function showCats(data) {
  try {
    const images = document.getElementById("images");
    let cats = JSON.parse(data);
    cats.forEach(element => {
      let img = document.createElement("img");
      img.src = element.url;
      images.appendChild(img);
    });
  } catch{
    console.log("Error en parse");
  }
}

window.onload = () => {
  ajax('GET', 'https://api.thecatapi.com/v1/images/search?category_ids=2&limit=5&page=1')
    .then(showCats)
    .catch((error) => {
      console.log("Error" + error.statusText + " - " + error.status);
    });
}