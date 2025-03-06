import { onMessageClick, onMessageKeydown, runSuccessMessage, runErrorMessage, onErrorMessageClick, onErrorMessageKeydown} from "./validation.js";

const getData = () => fetch(
  'https://28.javascript.htmlacademy.pro/kekstagram/data')
.then((response) => response.json());

const sendData = (formData, closePopup, unblockSubmitButton) => fetch(
  ' https://28.javascript.htmlacademy.pro/kekstagram ',
  {
    method: 'POST',
    body: formData,
  })
  .then((response) => {
    if (response.ok) {
      closePopup();
      runSuccessMessage();
      document.addEventListener('keydown', onMessageKeydown);
      document.querySelector('.success__button').addEventListener('click', onMessageClick)
      document.addEventListener('click', (evt) => {
        const target = evt.target
        const isMessage = document.querySelector('.success__inner') == target;
        if (!isMessage) {
          onMessageClick()
        };
      })
    }
    else {
      throw new Error('Не удалось отправить форму. Попробуйте еще раз');
    }
  })
  .catch(() => {
    closePopup();
    runErrorMessage();
    document.querySelector('.error__button').addEventListener('click', onErrorMessageClick);
    document.addEventListener('keydown', onErrorMessageKeydown);

  })
  .finally(() => {
    unblockSubmitButton();
    document.getElementById("upload-file").value = "";
  });

export {getData, sendData};
