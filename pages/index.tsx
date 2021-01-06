import React from "react";

import { verbs } from "../src/verbs";

import { getWordAndVarants, getVariants } from "../helpers/words";
import WordVariants from "../src/components/WordVariants";
import { LANGUAGE } from "../src/constants";

const HomePage = (props) => {
  const {
    dict = [],
    word,
    variants = [],
    nativeLanguage,
    languages,
    count,
  } = props;

  return (
    <WordVariants
      dict={dict}
      word={word}
      variants={variants}
      count={count}
      nativeLanguage={nativeLanguage}
      languages={languages}
    />
  );
};

HomePage.getInitialProps = () => {
  const count = 4;

  const dictIndxs = getVariants(verbs, 30);
  let dict = dictIndxs.map((i) => verbs[i]);

  let nativeLanguage = LANGUAGE.RU;

  let languages = [LANGUAGE.DE, LANGUAGE.RU];

  if (0) {
    dict = dictIndxs.map((i) => verbs[i].reverse());
    languages = languages.reverse();
  }

  const { word, variants } = getWordAndVarants(dict, { count });

  return { word, variants, dict, count, languages, nativeLanguage };
};

export default HomePage;
