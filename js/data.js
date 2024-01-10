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

const ALL_NAMES = [
  'Эдуард',
  'Иван',
  'Евгения',
  'Владимир',
  'Кристина',
  'Богдан',
  'Альберт',
  'Юлия',
  'Михаил',
  'Игорь',
  'Татьяна',
  'Виктория',
  'Камилла',
  'Глеб',
  'Артур',
  'Герман',
  'Виген',
  'Виген',
  'Виген',
  'Виген',
  'Виген',
  'Виген',
  'Виген',
  'Виген',
];
const text = [
  'Всё отлично! ',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально. ',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше. ',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше. ',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?! '
];
const descriptionPhotos = [
  'Золотистые лучи солнца проникают сквозь плотное лиственное покрывало, создавая игру света и тени в лесу.',
  'Волнующий закат над океаном, где небо расцветает от оранжевого к розовому.',
  'Портрет молодой художницы, увлеченно погруженной в работу над своим шедевром.',
  'Заснеженные горные вершины, высоко в небе, словно касаются облаков.',
  'Мгновение детской радости: маленькая девочка смеется, брызгаясь водой во время летних игр.',
  'Симметрия архитектурных линий и отражение зданий в стеклянных фасадах небоскребов.',
  'Одинокий парусник на горизонте, сливающийся с пастельными оттенками заката.',
  'Загадочная фотография с изогнутыми зеркалами, создающими иллюзию бесконечности.',
  'Макро съемка цветка, позволяющая увидеть деликатные текстуры и капельки росы.',
  'Вечерний городской пейзаж с мерцающими огоньками улиц и иллюминацией.',
  'Черно-белая фотография уличного художника, рисующего на тротуаре мелом.',
  'Портрет старика с глубокими морщинами и мудрым взглядом, рассказывающего истории прошлого.',
  'Сказочный вид на замок, окруженный зелеными холмами и туманными дали.',
  'Пламя костра в ночи, создающее теплое и уютное атмосферное освещение.',
  'Летний день на поляне, где цветы расцветают в яркой палитре красок.',
  'Стремительный поток горной реки, с кристально чистой водой и камнями на дне.',
  'Абстрактная композиция из ярких красок, играющих друг с другом на холсте.',
  'Ретро автомобиль, припаркованный перед старинным кафе, создает атмосферу прошлых десятилетий.',
  'Шумный городской праздник с фейерверками, освещающими ночное небо.',
  'Рассвет над горизонтом, где море превращается в мягкий отражающий зеркальный слой.',
  'Любопытный котенок, выглядывающий из-за угла с огромными глазами и пушистыми ушками.',
  'Таинственный лес, полный древних деревьев и зеленой листвы, прячущий множество загадок.',
  'Очаровательная улочка в старом городе, вымощенная брусчаткой и украшенная цветущими растениями.',
  'Эмоциональный момент на сцене, где музыканты играют с полной самоотдачей перед восхищенной публикой.',
  'Дружеский поцелуй под парящими яркими шариками во время летнего фестиваля.'
];

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