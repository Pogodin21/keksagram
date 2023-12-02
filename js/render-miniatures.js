import listObject from './mock-data.js';
/* <template id="picture">
    <a href="#" class="picture">
      <img class="picture__img" src="" width="182" height="182" alt="Случайная фотография">
      <p class="picture__info">
        <span class="picture__comments"></span>
        <span class="picture__likes"></span>
      </p>
    </a>
   </template> */

const pictureTemplate = document.querySelector('#picture').content;
const template = pictureTemplate.querySelector('.picture');
const fragment = document.createDocumentFragment();

function renderPictures() {
  listObject.forEach((element) => {
    const pictureTemplate = template.cloneNode(true);
    const pictureImg = pictureTemplate.querySelector('.picture__img');
    pictureImg.src = element.url;
    pictureTemplate.querySelector('.picture__likes').textContent = String(element.likes);
    pictureTemplate.querySelector('.picture__comments').textContent = String(element.comments.length);
    fragment.appendChild(pictureTemplate);
  });

  document.querySelector('.pictures').appendChild(fragment);
}

export {renderPictures};
