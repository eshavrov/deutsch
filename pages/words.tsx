import React from "react";

import WordVariants from "components/WordVariants";
import { getWordAndVarants } from "helpers/words";

import { LANGUAGE } from "constants/index";
import { getDictonary } from "constants/db";

const HomePage = (props) => {
  const { dict = [], word, variants = [], nativeLanguage, languages } = props;

  return (
    <WordVariants
      dict={dict}
      word={word}
      variants={variants}
      nativeLanguage={nativeLanguage}
      languages={languages}
    />
  );
};

HomePage.getInitialProps = ({ query }) => {
  let nativeLanguage = LANGUAGE.RU;

  let languages =
    query.lang === LANGUAGE.RU
      ? [LANGUAGE.RU, LANGUAGE.DE]
      : [LANGUAGE.DE, LANGUAGE.RU];

  // number of variants to answer
  const count = 4;

  const dict = getDictonary({ languages, count: 30 });

  const { word, variants } = getWordAndVarants(dict, { count });

  return { word, variants, dict, languages, nativeLanguage };
};

export default HomePage;
