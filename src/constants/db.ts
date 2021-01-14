// import { words200 as verbs } from "./verbs";
import { list as verbs } from "./a1/a1.1-l1";

import { LANGUAGE } from "./index";
import { getVariants } from "helpers/words";

const projection = ([phrase, translation], index) => {
  return {
    id: index,
    phrase,
    translation,
  };
};

const getDictonary = ({ count = 100, languages }) => {
  const [lang] = languages;
  console.log(verbs);
  return verbs
    .slice(0, 300)
    //.sort((a) => Math.random() - 0.5)
    .slice(0, count)
    .map(projection)
    .reduce((acc, entry) => {
      return { ...acc, [entry.id]: entry };
    }, {});

  const dictIndxs = getVariants(verbs, count);
  let dict = dictIndxs.map((i) => verbs[i]);

  if (lang === LANGUAGE.RU) {
    dict = dictIndxs.map((i) => verbs[i].reverse());
  }

  return dict.map(projection).reduce((acc, entry) => {
    return { ...acc, [entry.id]: entry };
  }, {});
};

export { getDictonary };
