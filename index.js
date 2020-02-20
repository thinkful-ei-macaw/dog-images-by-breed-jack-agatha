
function generateImageHtml(image) {
  return `
  <img src="${image}">
  `;
}

function generateErrorHTML(error) {
  return `
  <p>${error}</p>
  `;
}

function generateFriendlyError() {
  let html = generateErrorHTML('No breed found! Try searching again.');
  render('.image-container', html);
}

function clickSubmit() {
  $('.js-dog-breed').submit(event => {
    event.preventDefault();
    let input = $('.js-breed-input').val();
    searchForBreed(input);
  });
}

function processResponse(response) {
  const { status } = response;
  if(status !== 'success') {
    generateFriendlyError();
  } else {
    let img = getRandomBreedImage(response);
    let html = generateImageHtml(img);
    render('.image-container', html);
  }
}

function searchForBreed(breed) {
  breed = breed.toLowerCase();
  fetch(`https://dog.ceo/api/breed/${breed}/images`)
    .then(response => response.json())
    .then(responseJson => processResponse(responseJson))
    .catch(error => console.log(error));
}

function getRandomBreedImage(json) {
  let { message } = json;
  let randomIndex = Math.floor((message.length-1) * Math.random());
  return message[randomIndex];
}

function render(target, component) {
  $(target).html(component);
}

function main() {
  clickSubmit();
}

$(main);

