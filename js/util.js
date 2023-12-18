// Возвращает случайное число из заданного диапозона
function getRandomInteger(min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  console.log("getRandomInteger")
  return Math.floor(result);
};
// Функция с замыканием, котоая возвращает другую функцию возращающее число, если оно не применялось ранее.
function createRandomIdFromRangeGenerator(min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;


  };


};

const isEscapeKey = (evt) => evt.key === 'Escape';

export  {createRandomIdFromRangeGenerator, getRandomInteger};
export default isEscapeKey;