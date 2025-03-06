import {resetEffects, photoEffect, chosenEffect} from './effects.js';
import { zoomEffect, resetZoom, valueBoard} from './photo-editor.js';
import { sendData } from './api.js';

const uploadFile = document.querySelector('#upload-file');
const redactorForm = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('#upload-cancel');
const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const commentPlace  = form.querySelector('.text__description');
const hashtagPlace = form.querySelector('.text__hashtags');
const maxCommentLength = 140;
const maxTagSum = 5;
const templateSuccessMessage = document.querySelector('#success');
const templateErrorMessage = document.querySelector('#error');
const submitButton = document.querySelector('.img-upload__submit');

const closePopup = function(){
  redactorForm.classList.add('hidden');
  body.classList.remove('modal-open');
  resetEffects();
  resetZoom();
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

uploadFile.addEventListener('change', function(evt){
  evt.preventDefault();
  redactorForm.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  closeButton.addEventListener('click', onCancelButtonClick);
  photoEffect();
  zoomEffect();
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

const closeSuccessMessage = () => {
  const message = document.querySelector('.success');
  body.removeChild(message);
};

const onMessageKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeSuccessMessage();
}
};

const onMessageClick = () => {
  closeSuccessMessage();
}

const runSuccessMessage = () => {
  const successMassage = templateSuccessMessage.content.cloneNode(true);
  body.append(successMassage);

};

const closeErrorMessage = () => {
  const message = document.querySelector('.error');
  body.removeChild(message);
};

const onErrorMessageKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeErrorMessage();
    document.removeEventListener('keydown', onErrorMessageKeydown);
  }
};

const onErrorMessageClick = () => {
  closeErrorMessage();
  document.querySelector('.error__button').removeEventListener('click', onErrorMessageClick);
}

const runErrorMessage = () => {
  const errorMessage = templateErrorMessage.content.cloneNode(true);
  body.append(errorMessage);
}

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Сохраняю...'
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать'
};

const validatePhoto = (closePopup) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      const formData = new FormData();
      formData.append("filename", uploadFile.files[0])
      formData.append("scale", valueBoard.value)
      formData.append("effect", `${chosenEffect.name}`)
      sendData(formData, closePopup, unblockSubmitButton);
    }
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
};

export {validatePhoto, closePopup, runSuccessMessage, runErrorMessage, onMessageKeydown, onErrorMessageKeydown, onErrorMessageClick, onMessageClick, submitButton};
