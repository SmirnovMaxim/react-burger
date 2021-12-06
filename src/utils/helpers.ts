const shuffle = <T extends any[]>(arr: T) => {
  const array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const getRandomNumber = (limit: number) => Math.round(Math.random() * limit);

export {
  shuffle,
  getRandomNumber
};
