// import { words200 as verbs } from "./verbs";
// import { list as verbs } from "./a1/a1.1-l1";
import { verbs } from "./verbs";

import noun from "constants/dict/db-noun.json";

import { LANGUAGE } from "./index";
import { getVariants } from "helpers/words";

const projection = ([phrase, translation], index) => {
  return {
    id: index,
    phrase,
    translation,
  };
};

const _projection = ({ article, base, translate }, index) => {
  return {
    id: index,
    phrase: `${article ? `${article} ` : ""}${base}`,
    translation: translate,
  };
};
const getDictonary = ({ count = 100, languages }) => {
  const [lang] = languages;

  console.log("noun", noun.length);
  return (
    // verbs
    noun
      .filter(({ level }) => level === "A-1")
      .sort((a) => (Math.random() - 0.5, Math.random() - 0.5))
      .slice(0, 16)
      .slice(0, count)
      .map(_projection)
      .reduce((acc, entry) => {
        return { ...acc, [entry.id]: entry };
      }, {})
  );

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
