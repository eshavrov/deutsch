import { verbs } from "./verbs";
import { LANGUAGE } from "./index";
import { getVariants } from "helpers/words";

const getDictonary = ({ count = 100, languages }) => {
  const [lang] = languages;

  const dictIndxs = getVariants(verbs, count);
  let dict = dictIndxs.map((i) => verbs[i]);

  if (lang === LANGUAGE.RU) {
    dict = dictIndxs.map((i) => verbs[i].reverse());
  }

  return dict;
};

export { getDictonary };
