const randomIndex = (count) =>
  Math.max(0, Math.floor((Math.random() - 0.01) * count));

const getWord = (dictonary = {}) => {
  const keys = Object.keys(dictonary)
  const index = randomIndex(keys.length);

  const entry = dictonary[keys[index]];

  return entry;
};

const getVariants = (dictonary = {}, count = 4, word = null) => {
  const set = new Set();

  if (word) {
    set.add(word.id);
  }
  const keys = Object.keys(dictonary)

  const size = keys.length;

  while (set.size < count) set.add(randomIndex(size));

  return [...set.values()].sort(() => Math.random() - 0.5);
};

const getWordAndVarants = (dict = {}, { count = 4 } = {}) => {
  const word = getWord(dict);
  const variants = getVariants(dict, count, word);

  return { word, variants };
};

export { randomIndex, getWord, getVariants, getWordAndVarants };
