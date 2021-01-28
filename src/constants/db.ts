// import { words200 as verbs } from "./verbs";
// import { list as verbs } from "./a1/a1.1-l1";
import { verbs } from "./verbs";

import noun from "constants/dict/db-noun.json";

import { LANGUAGE } from "./index";
import { getVariants } from "helpers/words";

const projectionContext = (context) => {
  return context.map(([phrase, translation = ""]) => {
    return {
      phrase,
      translation,
    };
  });
};

const projection = ([phrase, translation, context], index) => {
  return {
    id: index,
    phrase,
    translation,
    context: projectionContext(context),
  };
};
const COLOR = {
  die: "#ff7189",
  der: "#1aa0c5",
  das: "orange",
  default: "grey",
};

const _projection = ({ article, base, translate, context }, index) => {
  return {
    id: index,
    phrase: `${article ? `${article} ` : ""}${base}`,
    translation: translate, //.split(";").slice(0, 2).join(";"),
    context: projectionContext(context),
    color: COLOR[article] || COLOR.default,
  };
};
const getDictonary = ({ count = 100, languages }) => {
  const [lang] = languages;

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
