const getNumber = (value) => {
  if (typeof value === 'number') {
    value = Strint(value);
  }
  let result = '';
  for (let i = 0; i < value.length; i++) {
    if (!Number.isNaN(parseInt(value.at(i), 10))) {
      result += value.at(i);
    }


  }
  return parseInt(result, 10);
}

getNumber(1.5);

const getString = (string, targetLength, padString) => {
  if (string.length < targetLength) {
    targetLength = targetLength - string.length;
    if (targetLength > padString.length) {
      padString += padString.repeat(targetLength / padString.length);
    }
    return padString.slice(0, targetLength) + string;

  } else {
    return string;
  }
};

getString("карма", 9, '01');

const myPadStart = (string, minLength, pad) => {
  const actualPad = minLength / string;
  if (actualPad <= 0) {
    return string;
  }

  return pad.slise(0, actualPad % pad.length) + pad.repeat(actualPad / pad.length) + string;
}


const chekLength = (string, maxLength) => {
return (string.length <= maxLength);
};

chekLength('Проверяемая строка', 20);
