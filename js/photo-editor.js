const zoomOut = document.querySelector('.scale__control--smaller');
const zoomIn = document.querySelector('.scale__control--bigger');
const valueBoard =  document.querySelector('.scale__control--value');
const previewPhoto = document.querySelector('.img-upload__preview').children[0];
const minValue = 25;
const maxValue = 100;
const step = 25;


const runZoomOut = (evt) => {
  evt.preventDefault();
    let currentValue = parseInt(valueBoard.value);
    currentValue -= step;
    if (currentValue >= minValue ) {
      valueBoard.value = currentValue.toString() + '%' ;
    };
    previewPhoto.style.transform = `scale(${valueBoard.value})`;
};

const runZoomIn = (evt) => {
  evt.preventDefault();
  let currentValue = parseInt(valueBoard.value);
  currentValue += step;
  if (currentValue <= maxValue ) {
    valueBoard.value = currentValue.toString() + '%' ;
  };
  previewPhoto.style.transform = `scale(${valueBoard.value})`;
}

const zoomEffect = () => {
  valueBoard.value = '100%';

  zoomOut.addEventListener('click', runZoomOut);
  zoomIn.addEventListener('click', runZoomIn);
};

const resetZoom = () => {
  valueBoard.value = '100%';
  previewPhoto.style.transform = `scale(${valueBoard.value})`
  zoomOut.removeEventListener('click', runZoomOut);
  zoomIn.removeEventListener('click', runZoomIn);
};



export {zoomEffect, resetZoom, valueBoard};








