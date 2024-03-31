const zoomOut = document.querySelector('.scale__control--smaller');
const zoomIn = document.querySelector('.scale__control--bigger');
const valueBoard =  document.querySelector('.scale__control--value');
const previewPhoto = document.querySelector('.img-upload__preview').children[0];
const minValue = 25;
const maxValue = 100;
const step = 25;

const resetZoom = function() {
  valueBoard.value = '100%';
  previewPhoto.style.transform = `scale(${valueBoard.value})`
};

const zoomEffect = function() {
  valueBoard.value = '100%';

  zoomOut.addEventListener('click', function(evt) {

    evt.preventDefault();
    let currentValue = parseInt(valueBoard.value);
    currentValue -= step;
    if (currentValue >= minValue ) {
      valueBoard.value = currentValue.toString() + '%' ;
    };
    previewPhoto.style.transform = `scale(${valueBoard.value})`;
  });

  zoomIn.addEventListener('click', function(evt) {
    evt.preventDefault();
    let currentValue = parseInt(valueBoard.value);
    currentValue += step;
    console.log(currentValue);
    if (currentValue <= maxValue ) {
      valueBoard.value = currentValue.toString() + '%' ;
    };
    previewPhoto.style.transform = `scale(${valueBoard.value})`;
  });
};



export {zoomEffect, resetZoom};








