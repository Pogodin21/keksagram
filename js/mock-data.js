import {ALL_NAMES, text, descriptionPhotos} from './consts.js';
import {createRandomIdFromRangeGenerator, getRandomInteger} from './util.js';
const minPhotoNumber = 1;
const maxPhotoNumber = 6;
const minIdNumber = 1;
const maxIdNumber = 20000;
const minLikes = 15;
const maxLikes = 200;
const minPhotoId = 1;
const maxPhotoId = 25;
const minId = 1;
const maxId = 25;
const minCountComment = 1;
const maxCountComment = 20;

const generatePhotoId = createRandomIdFromRangeGenerator(minIdNumber, maxIdNumber);

// Функция, которая возвращает строку img/avatar-{{случайное число от 1 до 6}}.svg.
function addRandomPhoto(min, max) {
  let numberPhoto = `img/avatar-${getRandomInteger(min, max)}.svg`;

  return numberPhoto;
}

// возвращает случайных одно или два предложения из массива text
function createRandomText() {
  if (getRandomInteger(0, 2) === 0) {
    return text[getRandomInteger(0, text.length - 1)];
  }
  return text[getRandomInteger(0, text.length - 1)] + ' ' + text[getRandomInteger(0, text.length - 1)];
}

// Возвращает случайное имя из массива ALL_NAMES
function getRandomName() {
  return ALL_NAMES[getRandomInteger(0, ALL_NAMES.length - 1)];
}

// возвращает объект содержащий комметраний
function getComment () {
  return {
    id: generatePhotoId(),
    avatar: addRandomPhoto(minPhotoNumber, maxPhotoNumber),
    message: createRandomText(),
    name: getRandomName(),
  };

}

// Возвращает массив заполненый объектами с коментариями
function comment() {
  return Array.from({length: getRandomInteger(minCountComment, maxCountComment)}, getComment);
}


function getIndexDescriptionPhoto() {
  const previousIndexDescription = [];

  return function () {
    let currentValue = getRandomInteger(0, descriptionPhotos.length - 1);
    while (previousIndexDescription.includes(currentValue)) {
      currentValue = getRandomInteger(0, descriptionPhotos.length - 1);
    }
    previousIndexDescription.push(currentValue);
    return currentValue;

  }
}
const getDescriptionPhoto = getIndexDescriptionPhoto();

// Возвращает уникальный Id
function getUniqueId(min, max) {
  const previousId= [];

  return function () {
    let currentId = getRandomInteger(min , max);
    while (previousId.includes(currentId)) {
      currentId = getRandomInteger(min , max);
    }
    previousId.push(currentId);
    return currentId;
  };

}
// const getActualLink = getUniqueId(minPhotoId, maxPhotoId);
const getPhoto = function(minPhotoId, maxPhotoId) {
  const previousNumbers= [];

  return function () {
    for (let i = minPhotoId; i <= maxPhotoId; i++) {
    if (!previousNumbers.includes(i)) {
        previousNumbers.push(i);
        return i;
      }
  }
  }
}
const getActualId = getUniqueId(minId, maxId)
const getActualLink = getPhoto(minPhotoId, maxPhotoId);
// Возвращает объект со значениями + массив объектов
function getObject () {

  return {
    id: getActualId(),
    url: 'photos/' + getActualLink() + '.jpg',
    description: descriptionPhotos[getDescriptionPhoto()],
    likes: getRandomInteger(minLikes, maxLikes),
    comments: comment()
  }

}

const listObject = Array.from({length: 25});
for (let i = 0; i < listObject.length; i++){
  listObject[i] = getObject();
}

// console.log(JSON.stringify(listObject, null, 2));

export default listObject;