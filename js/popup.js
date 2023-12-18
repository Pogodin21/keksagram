import listObject from './mock-data.js';
import isEscapeKey from './util.js';

const sectionPictures = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = document.querySelector('.big-picture__img');
const likesCount = document.querySelector('.likes-count');
const commentsCount = document.querySelector('.comments-count');
const socialComments = document.querySelector('.social__comments');
const socialCaption = document.querySelector('.social__caption');
const socialCommentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const bodyTag = document.querySelector('body');
const resetButton = document.querySelector('.big-picture__cancel');



const addComment = function (element) {
  const newComment = document.createElement('li');
  newComment.classList.add('social__comment');
  const newPictureComment = document.createElement('img');
  newPictureComment.classList.add('social__picture');
  newPictureComment.src = element.avatar;
  newPictureComment.alt = element.name;
  newPictureComment.width = "35";
  newPictureComment.height = "35";
  const newTextComment = document.createElement('p');
  newTextComment.classList.add('social__text');
  newTextComment.textContent = element.message;
  newComment.appendChild(newPictureComment);
  newComment.appendChild(newTextComment);
  return newComment;

};



// функция, для обработчика, которая открывает окно с подробной информацией о фотографии ()
const pictureListener = function (evt) {
  listObject.forEach(element => {
    if (element.id == evt.target.id) {
      bigPicture.classList.remove('hidden');
      bigPictureImg.querySelector('img').src = element.url;
      likesCount.textContent = String(element.likes);
      commentsCount.textContent = String(element.comments.length);
      socialComments.innerHTML = '';

      const loadComments = (evt) => {
        const commentCount = socialComments.children;
        const partComments = element.comments.slice(commentCount.length, commentCount.length + 5);

        for (let i = 0; i < partComments.length; i++) {
          socialComments.appendChild(addComment(partComments[i]));
          if (commentCount.length === element.comments.length) {
            commentsLoader.classList.add('hidden');
          };

        };
        socialCommentCount.textContent = String(commentCount.length) + ' из ' + String(element.comments.length) + ' комментариев';
      }

      const onDocumentKeydown = (evt) => {
        if (isEscapeKey(evt)) {
          evt.preventDefault();
          closePopup();
        };
      };

      const closePopup = () => {

        bigPicture.classList.add('hidden');
        bodyTag.classList.remove('modal-open');

        // !!!
        commentsLoader.removeEventListener("click", loadComments)
        // !!!


      };

      if (commentsLoader.classList.contains('hidden')){
        commentsLoader.classList.remove('hidden');
      };
      loadComments();
      commentsLoader.addEventListener('click', loadComments);

      socialCaption.textContent = element.description;
      bodyTag.classList.add('modal-open');

      document.addEventListener('keydown', onDocumentKeydown);
      resetButton.addEventListener('click', closePopup);
    };
  });
};

const addListener = function (section) {
  section.addEventListener('click', pictureListener);
};

export {addListener, sectionPictures};