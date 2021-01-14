import React from "react";
import { Layout } from "components/common";

import WordVariants from "components/WordVariants";
import { getWordAndVarants } from "helpers/words";

import { LANGUAGE } from "constants/index";
import { getDictonary } from "constants/db";

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
  let nativeLanguage = LANGUAGE.RU;
  let languages = [LANGUAGE.DE, LANGUAGE.RU];

  // number of variants to answer
  const count = 4;

  const dict = getDictonary({ languages, count: 300 });

  const { word, variants } = getWordAndVarants(dict, { count });

  return { word, variants, dict, languages, nativeLanguage };
};

HomePage.Layout = Layout;

export default HomePage;
