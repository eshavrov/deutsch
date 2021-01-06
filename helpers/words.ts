const randomIndex = (count) =>
  Math.max(0, Math.floor((Math.random() - 0.01) * count));

const getWord = (dictonary = []) => {
  const id = randomIndex(dictonary.length);

  return {
    id,
    value: dictonary[id][0],
    description: dictonary[id][1],
  };
};

const getVariants = (word, count = 4, dictonary = []) => {
  const set = new Set();
  set.add(word.id);

  const size = dictonary.length;

  while (set.size < count) set.add(randomIndex(size));

  return [...set.values()].sort(() => Math.random() - 0.5);
};

const getWordAndVarants = (dict = [], countVariants = 4) => {
  const word = getWord(dict);
  const variants = getVariants(word, countVariants, dict);

  return { word, variants };
};

export { randomIndex, getWord, getVariants, getWordAndVarants };
