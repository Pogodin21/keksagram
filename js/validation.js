const uploadFile = document.querySelector('#upload-file');
const redactorForm = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('#upload-cancel');
const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const commentPlace  = form.querySelector('.text__description');
const hashtagPlace = form.querySelector('.text__hashtags');
const maxCommentLength = 140;
const maxTagSum = 5;

const closePopup = function(){
  redactorForm.classList.add('hidden');
  body.classList.remove('modal-open');
};

const onCancelButtonClick = function(){
  closePopup();
};

const onDocumentKeydown = function(evt) {
  if (evt.key === 'Escape') {
      evt.preventDefault();
      closePopup();
  }
};

uploadFile.addEventListener('click', function(evt){
  evt.preventDefault();
  redactorForm.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  closeButton.addEventListener('click', onCancelButtonClick);
});

const pristine = new Pristine(form, {
  classTo: 'form__item',
  errorTextParent: 'form__item',
});


const validateDescription = function (value) {
  return value.length <= maxCommentLength;
};

pristine.addValidator(commentPlace, validateDescription, 'Максимальная длинна комментария 140 символов');


function hashtagValidator(value) {
  const re = /^#[\w\d]{1,19}$/;
  const hashtags = value
  .toLowerCase()
  .trim()
  .split(' ')
  .filter((word) => !word.length == 0);

  const areAllHashtagsUnique = (new Set(hashtags)).size === hashtags.length
  const areHashtagsValid = hashtags.every((hashtag) => re.test(hashtag))

  return areHashtagsValid
  && areAllHashtagsUnique
  && hashtags.length <= maxTagSum;
};

pristine.addValidator(hashtagPlace, hashtagValidator, 'Форма невалидна');

form.addEventListener('submit', function(evt) {
  evt.preventDefault();
  pristine.validate();
});

commentPlace.onfocus = function() {
  document.removeEventListener('keydown', onDocumentKeydown)
};

commentPlace.onblur = function() {
  document.addEventListener('keydown', onDocumentKeydown)
};

hashtagPlace.onfocus = function() {
  document.removeEventListener('keydown', onDocumentKeydown)
};

hashtagPlace.onblur = function() {
  document.addEventListener('keydown', onDocumentKeydown)
};